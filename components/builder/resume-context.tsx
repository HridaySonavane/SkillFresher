"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import type { ResumeData } from "@/lib/document-generators/types"

interface ResumeContextType {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
  templateId: string
  setTemplateId: (id: string) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
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
    <ResumeContext.Provider value={{ resumeData, setResumeData, templateId, setTemplateId }}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
} 