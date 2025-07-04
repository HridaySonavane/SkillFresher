"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Star, Crown, Sparkles } from "lucide-react"
import Image from "next/image"

const templates = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    category: "Professional",
    isPremium: false,
    rating: 4.8,
    downloads: 2543,
    preview: "/placeholder.svg?height=400&width=300",
    thumbnail: "/placeholder.svg?height=200&width=150",
    description: "Clean and contemporary design perfect for most industries",
    features: ["ATS Optimized", "AI Enhanced", "Single Column"],
    industries: ["Technology", "Finance", "Consulting"],
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    category: "Creative",
    isPremium: true,
    rating: 4.9,
    downloads: 1876,
    preview: "/placeholder.svg?height=400&width=300",
    thumbnail: "/placeholder.svg?height=200&width=150",
    description: "Visually appealing template perfect for creative roles",
    features: ["Photo Ready", "Two Column", "Color Accents"],
    industries: ["Design", "Marketing", "Media"],
  },
  {
    id: "tech-minimalist",
    name: "Tech Minimalist",
    category: "Technology",
    isPremium: false,
    rating: 4.7,
    downloads: 3201,
    preview: "/placeholder.svg?height=400&width=300",
    thumbnail: "/placeholder.svg?height=200&width=150",
    description: "Clean, code-friendly design for tech professionals",
    features: ["ATS Optimized", "Minimalist", "Tech Focused"],
    industries: ["Technology", "Software", "Startup"],
  },
  {
    id: "executive-classic",
    name: "Executive Classic",
    category: "Professional",
    isPremium: true,
    rating: 4.9,
    downloads: 987,
    preview: "/placeholder.svg?height=400&width=300",
    thumbnail: "/placeholder.svg?height=200&width=150",
    description: "Traditional format ideal for senior positions",
    features: ["Executive Level", "Traditional", "Premium"],
    industries: ["Finance", "Legal", "Executive"],
  },
  {
    id: "academic-researcher",
    name: "Academic & Research",
    category: "Academic",
    isPremium: false,
    rating: 4.6,
    downloads: 654,
    preview: "/placeholder.svg?height=400&width=300",
    thumbnail: "/placeholder.svg?height=200&width=150",
    description: "Comprehensive format for academic positions",
    features: ["Publication Ready", "Research Focused", "Detailed"],
    industries: ["Education", "Research", "Healthcare"],
  },
  {
    id: "startup-founder",
    name: "Startup Founder",
    category: "Creative",
    isPremium: true,
    rating: 4.8,
    downloads: 1234,
    preview: "/placeholder.svg?height=400&width=300",
    thumbnail: "/placeholder.svg?height=200&width=150",
    description: "Bold design for entrepreneurs and innovators",
    features: ["Bold Design", "Startup Focused", "Modern"],
    industries: ["Startup", "Technology", "Innovation"],
  },
]

export function TemplateGallery() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handlePreview = (templateId: string) => {
    setSelectedTemplate(templateId)
    // Open preview modal or navigate to preview page
  }

  const handleUseTemplate = (templateId: string) => {
    // Navigate to resume builder with selected template
    window.location.href = `/builder?template=${templateId}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Templates</h2>
          <p className="text-gray-600">{templates.length} professional templates available</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            Grid
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            List
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {templates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              {/* Template Preview */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-gray-100">
                <Image
                  src={template.preview || "/placeholder.svg"}
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Action Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" onClick={() => handlePreview(template.id)}>
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={() => handleUseTemplate(template.id)}>
                    Use Template
                  </Button>
                </div>

                {/* Premium Badge */}
                {template.isPremium && (
                  <Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}

                {/* Category Badge */}
                <Badge variant="secondary" className="absolute top-3 left-3">
                  {template.category}
                </Badge>
              </div>

              {/* Template Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handlePreview(template.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => handleUseTemplate(template.id)}>
                    {template.isPremium ? (
                      <>
                        <Crown className="w-4 h-4 mr-1" />
                        Use Premium
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-1" />
                        Use Free
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg" className="bg-transparent">
          Load More Templates
        </Button>
      </div>
    </div>
  )
}
