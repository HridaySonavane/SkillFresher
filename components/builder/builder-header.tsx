"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Eye, Save, Share2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function BuilderHeader() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "modern-professional"
  
  const getTemplateName = (id: string) => {
    const templates: Record<string, string> = {
      "modern-professional": "Modern Professional",
      "creative-designer": "Creative Designer", 
      "tech-minimalist": "Tech Minimalist",
      "executive-classic": "Executive Classic",
      "academic-researcher": "Academic & Research",
      "startup-founder": "Startup Founder"
    }
    return templates[id] || "Modern Professional"
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/templete">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Templates
            </Link>
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Resume Builder</h1>
            <p className="text-sm text-gray-500">{getTemplateName(templateId)} Template</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary">Draft</Badge>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </header>
  )
} 