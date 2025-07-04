import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer"
import type { ResumeData, Template } from "./types"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contact: {
    fontSize: 11,
    color: "#666666",
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingBottom: 2,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  company: {
    fontSize: 11,
    color: "#666666",
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    marginLeft: 10,
  },
})

const PDFResume = ({ data, template }: { data: ResumeData; template: Template }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.contact}>
          {data.personalInfo.email} | {data.personalInfo.phone}
        </Text>
        <Text style={styles.contact}>{data.personalInfo.location}</Text>
        {data.personalInfo.linkedin && <Text style={styles.contact}>{data.personalInfo.linkedin}</Text>}
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>{exp.position}</Text>
            <Text style={styles.company}>
              {exp.company} | {exp.startDate} - {exp.endDate}
            </Text>
            {exp.description.map((desc, i) => (
              <Text key={i} style={styles.description}>
                • {desc}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>{edu.degree}</Text>
            <Text style={styles.company}>
              {edu.institution} | {edu.graduationDate}
            </Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <Text style={styles.description}>{data.skills.join(" • ")}</Text>
      </View>
    </Page>
  </Document>
)

export async function generatePDF(data: ResumeData, template: Template): Promise<Buffer> {
  const doc = <PDFResume data={data} template={template} />
  const pdfBuffer = await pdf(doc).toBuffer()
  return pdfBuffer
}
