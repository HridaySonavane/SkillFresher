"use client"

import React, { createContext, useContext, useState } from "react"
import type { ResumeData } from "@/lib/document-generators/types"

type ResumeBuilderContextType = {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
  templateId: string
  setTemplateId: (id: string) => void
}

const ResumeBuilderContext = createContext<ResumeBuilderContextType | undefined>(undefined)

export function ResumeBuilderProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  })
  const [templateId, setTemplateId] = useState("modern-professional")

  return (
    <ResumeBuilderContext.Provider value={{ resumeData, setResumeData, templateId, setTemplateId }}>
      {children}
    </ResumeBuilderContext.Provider>
  )
}

export function useResumeBuilder() {
  const ctx = useContext(ResumeBuilderContext)
  if (!ctx) throw new Error("useResumeBuilder must be used within ResumeBuilderProvider")
  return ctx
} 