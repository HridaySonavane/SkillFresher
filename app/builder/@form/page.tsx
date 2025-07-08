"use client"

import { useResumeBuilder } from "@/components/builder/resume-builder-context"
import { ResumeForm } from "@/components/builder/resume-form"

export default function FormPage() {
  const { resumeData, setResumeData, templateId } = useResumeBuilder()
  return (
    <div className="h-full overflow-y-auto">
      <ResumeForm
        data={resumeData}
        onDataChange={setResumeData}
        templateId={templateId}
      />
    </div>
  )
} 