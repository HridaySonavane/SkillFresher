import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx"
import type { ResumeData, Template } from "./types"

export async function generateDOCX(data: ResumeData, template: Template): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          // Header - Name
          new Paragraph({
            children: [
              new TextRun({
                text: data.personalInfo.name,
                bold: true,
                size: 32, // 16pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          // Contact Information
          new Paragraph({
            children: [
              new TextRun({
                text: `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`,
                size: 20, // 10pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Professional Summary
          ...(data.summary
            ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "PROFESSIONAL SUMMARY",
                      bold: true,
                      size: 24, // 12pt
                    }),
                  ],
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 200, after: 200 },
                  border: {
                    bottom: {
                      color: "CCCCCC",
                      space: 1,
                      style: BorderStyle.SINGLE,
                      size: 6,
                    },
                  },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: data.summary,
                      size: 20,
                    }),
                  ],
                  spacing: { after: 300 },
                }),
              ]
            : []),

          // Professional Experience
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL EXPERIENCE",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 },
            border: {
              bottom: {
                color: "CCCCCC",
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
          }),

          // Experience Items
          ...data.experience.flatMap((exp, index) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.position,
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { before: index > 0 ? 300 : 100, after: 50 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.company} | ${exp.startDate} - ${exp.endDate}`,
                  size: 20,
                  italics: true,
                }),
              ],
              spacing: { after: 100 },
            }),
            ...exp.description.map(
              (desc) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `• ${desc}`,
                      size: 20,
                    }),
                  ],
                  indent: { left: 360 }, // 0.25 inch
                  spacing: { after: 100 },
                }),
            ),
          ]),

          // Education
          new Paragraph({
            children: [
              new TextRun({
                text: "EDUCATION",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
            border: {
              bottom: {
                color: "CCCCCC",
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
          }),

          ...data.education.flatMap((edu) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.degree,
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { after: 50 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.institution} | ${edu.graduationDate}`,
                  size: 20,
                  italics: true,
                }),
              ],
              spacing: { after: 200 },
            }),
          ]),

          // Skills
          new Paragraph({
            children: [
              new TextRun({
                text: "SKILLS",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
            border: {
              bottom: {
                color: "CCCCCC",
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: data.skills.join(" • "),
                size: 20,
              }),
            ],
          }),
        ],
      },
    ],
  })

  // Convert to buffer
  const buffer = await doc.toBuffer()
  return buffer
}
