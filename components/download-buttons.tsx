"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText, File } from "lucide-react"
import type { ResumeData, Template } from "@/lib/document-generators/types"

interface DownloadButtonsProps {
  resumeData: ResumeData
  template: Template
}

export function DownloadButtons({ resumeData, template }: DownloadButtonsProps) {
  const [isGenerating, setIsGenerating] = useState<{
    pdf: boolean
    docx: boolean
    both: boolean
  }>({
    pdf: false,
    docx: false,
    both: false,
  })

  const downloadFile = async (format: "pdf" | "docx" | "both") => {
    setIsGenerating((prev) => ({ ...prev, [format]: true }))

    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeData,
          template,
          format,
        }),
      })

      if (format === "both") {
        const { files } = await response.json()

        // Download PDF
        const pdfBlob = new Blob([Buffer.from(files.pdf, "base64")], {
          type: "application/pdf",
        })
        const pdfUrl = URL.createObjectURL(pdfBlob)
        const pdfLink = document.createElement("a")
        pdfLink.href = pdfUrl
        pdfLink.download = `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`
        pdfLink.click()
        URL.revokeObjectURL(pdfUrl)

        // Download DOCX
        const docxBlob = new Blob([Buffer.from(files.docx, "base64")], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })
        const docxUrl = URL.createObjectURL(docxBlob)
        const docxLink = document.createElement("a")
        docxLink.href = docxUrl
        docxLink.download = `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.docx`
        docxLink.click()
        URL.revokeObjectURL(docxUrl)
      } else {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.${format}`
        link.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Download failed:", error)
      // Add error handling/toast notification
    } finally {
      setIsGenerating((prev) => ({ ...prev, [format]: false }))
    }
  }

  return (
    <div className="flex gap-3 flex-wrap">
      <Button onClick={() => downloadFile("pdf")} disabled={isGenerating.pdf} className="flex items-center gap-2">
        <FileText className="w-4 h-4" />
        {isGenerating.pdf ? "Generating PDF..." : "Download PDF"}
      </Button>

      <Button
        onClick={() => downloadFile("docx")}
        disabled={isGenerating.docx}
        variant="outline"
        className="flex items-center gap-2"
      >
        <File className="w-4 h-4" />
        {isGenerating.docx ? "Generating DOCX..." : "Download Word"}
      </Button>

      <Button
        onClick={() => downloadFile("both")}
        disabled={isGenerating.both}
        variant="secondary"
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        {isGenerating.both ? "Generating Both..." : "Download Both"}
      </Button>
    </div>
  )
}
