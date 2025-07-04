"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Plus, Sparkles } from "lucide-react"

export function ResumePreview() {
  return (
    <div className="relative">
      {/* Main Preview Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[600px]">
          {/* Left Panel - Form */}
          <div className="bg-gray-900 text-white p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Basics
                </h3>
                <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                  AI Enhanced
                </Badge>
              </div>

              {/* Profile Picture */}
              <div className="space-y-2">
                <Label className="text-gray-300">Picture</Label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    Upload
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Full Name</Label>
                  <Input
                    defaultValue="John Doe"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Headline</Label>
                  <Input
                    defaultValue="Senior Software Engineer"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Email</Label>
                    <Input
                      defaultValue="john@example.com"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Phone</Label>
                    <Input
                      defaultValue="+1 (555) 123-4567"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Location</Label>
                  <Input
                    defaultValue="San Francisco, CA"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </div>

                <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add a custom field
                </Button>
              </div>

              {/* Summary Section */}
              <div className="space-y-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Summary</h4>
                  <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI Enhance
                  </Button>
                </div>
                <Textarea
                  defaultValue="Experienced software engineer with 8+ years of expertise in full-stack development..."
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="bg-white p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                <p className="text-lg text-gray-600 mt-1">Senior Software Engineer</p>
                <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    john@example.com
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    +1 (555) 123-4567
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    San Francisco, CA
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Experienced software engineer with 8+ years of expertise in full-stack development, specializing in
                  React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and
                  delivering scalable solutions that drive business growth.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Professional Experience</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">Senior Software Engineer</h3>
                      <span className="text-sm text-gray-500">2020 - Present</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">TechCorp Inc. • San Francisco, CA</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Led development of microservices architecture serving 1M+ users</li>
                      <li>• Improved application performance by 40% through optimization</li>
                      <li>• Mentored 5 junior developers and established coding standards</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Badge */}
      <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered</span>
        </div>
      </div>
    </div>
  )
}
