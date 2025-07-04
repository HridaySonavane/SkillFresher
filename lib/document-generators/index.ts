import { generatePDF } from "./pdf-generator"
import { generateDOCX } from "./docx-generator"
import type { ResumeData, Template, DocumentFormat } from "./types"

export class DocumentGenerator {
  static async generate(data: ResumeData, template: Template, format: DocumentFormat): Promise<Buffer> {
    switch (format) {
      case "pdf":
        return generatePDF(data, template)
      case "docx":
        return generateDOCX(data, template)
      default:
        throw new Error(`Unsupported format: ${format}`)
    }
  }

  static async generateBoth(data: ResumeData, template: Template): Promise<{ pdf: Buffer; docx: Buffer }> {
    const [pdf, docx] = await Promise.all([generatePDF(data, template), generateDOCX(data, template)])

    return { pdf, docx }
  }
}

export * from "./types"
