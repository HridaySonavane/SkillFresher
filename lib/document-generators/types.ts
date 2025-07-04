export interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin?: string
    website?: string
  }
  summary: string
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string[]
  }>
  education: Array<{
    institution: string
    degree: string
    graduationDate: string
    gpa?: string
  }>
  skills: string[]
  projects?: Array<{
    name: string
    description: string
    technologies: string[]
    url?: string
  }>
}

export interface Template {
  id: string
  name: string
  styles: {
    fonts: {
      primary: string
      secondary: string
    }
    colors: {
      primary: string
      secondary: string
      text: string
    }
    spacing: {
      section: number
      paragraph: number
    }
  }
}

export type DocumentFormat = "pdf" | "docx"
