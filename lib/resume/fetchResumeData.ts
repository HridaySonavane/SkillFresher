import { supabase } from "@/lib/supabase/auth";
import type { ResumeData } from "@/lib/document-generators/types";

// Insert a new resume and return the inserted row (including template_id and id)
export async function insertResume(
  userId: string,
  data: ResumeData,
  templateId: string,
  title: string // <-- require title from the user
) {
  const { data: inserted, error } = await supabase
    .from("resumes")
    .insert([
      {
        user_id: userId,
        title, // <-- required
        template_id: templateId,
        personal_info: data.personalInfo,
        professional_summary: data.summary,
        work_experience: data.experience,
        education: data.education,
        skills: data.skills,
        projects: data.projects,
        // You can add more fields if needed, or let defaults handle them
      }
    ])
    .select("*")
    .single();

  if (error || !inserted) {
    throw new Error("Failed to insert resume: " + (error?.message || "Unknown error"));
  }

  return inserted; // contains template_id, id, etc.
}

// Fetch resume data by resumeId (primary key)
export async function fetchResumeDataById(resumeId: string): Promise<ResumeData & { templateId: string }> {
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .single();

  if (error || !data) throw new Error("Resume not found");

  return {
    personalInfo: data.personal_info,
    summary: data.professional_summary || "",
    experience: data.work_experience || [],
    education: data.education || [],
    skills: data.skills || [],
    projects: data.projects || [],
    templateId: data.template_id,
  };
}