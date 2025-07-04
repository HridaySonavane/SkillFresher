"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen } from "lucide-react"
import { ResumePreview } from "./resume-preview"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Version Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                Version 2.0
              </Badge>
              <span className="text-sm text-gray-600">What's new in the latest version</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <p className="text-lg text-gray-600 font-medium">Finally,</p>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                An AI-powered resume builder
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Create professional, ATS-optimized resumes with AI assistance. Build, customize, and download your perfect
              resume in minutes, not hours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <a href="/auth/signup">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent" asChild>
                <a href="#features">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn more
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Resumes created</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">ATS pass rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">User rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Resume Preview */}
          <div className="relative">
            <ResumePreview />
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-50 to-transparent rounded-full blur-3xl opacity-70" />
      </div>
    </section>
  )
}
