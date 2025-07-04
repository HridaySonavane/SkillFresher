import { type NextRequest, NextResponse } from "next/server"
import { DocumentGenerator } from "@/lib/document-generators"
import type { ResumeData, Template, DocumentFormat } from "@/lib/document-generators/types"

export async function POST(request: NextRequest) {
  try {
    const { resumeData, template, format } = (await request.json()) as {
      resumeData: ResumeData
      template: Template
      format: DocumentFormat | "both"
    }

    if (format === "both") {
      const { pdf, docx } = await DocumentGenerator.generateBoth(resumeData, template)

      return NextResponse.json({
        success: true,
        files: {
          pdf: pdf.toString("base64"),
          docx: docx.toString("base64"),
        },
      })
    } else {
      const buffer = await DocumentGenerator.generate(resumeData, template, format)

      const mimeType =
        format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": mimeType,
          "Content-Disposition": `attachment; filename="resume.${format}"`,
        },
      })
    }
  } catch (error) {
    console.error("Resume generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate resume" }, { status: 500 })
  }
}
