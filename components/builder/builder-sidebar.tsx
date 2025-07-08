"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Settings, Palette, Download, Share2 } from "lucide-react"
import { useResumeBuilder } from "@/components/builder/resume-builder-context";

const templates = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    category: "Professional",
    isPremium: false,
    thumbnail: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    category: "Creative",
    isPremium: true,
    thumbnail: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "tech-minimalist",
    name: "Tech Minimalist",
    category: "Technology",
    isPremium: false,
    thumbnail: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "executive-classic",
    name: "Executive Classic",
    category: "Professional",
    isPremium: true,
    thumbnail: "/placeholder.svg?height=200&width=150",
  },
]

export function BuilderSidebar() {
  const { templateId, setTemplateId } = useResumeBuilder();

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-6">
      {/* Template Selection */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Template
        </h3>
        <div className="space-y-2">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                templateId === template.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setTemplateId(template.id)}
            >
              <CardContent className="p-3">
                <div className="aspect-[3/4] bg-gray-100 rounded mb-2" />
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{template.name}</div>
                  {template.isPremium && (
                    <Badge variant="secondary" className="text-xs">Premium</Badge>
                  )}
                </div>
                {templateId === template.id && (
                  <Badge variant="default" className="text-xs mt-1 w-full">Active</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Customization */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Customization</h3>
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Palette className="w-4 h-4 mr-2" />
            Colors & Fonts
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Layout Options
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            Share Resume
          </Button>
        </div>
      </div>
    </div>
  )
} 