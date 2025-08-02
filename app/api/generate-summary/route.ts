/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const FLASK_API_URL = process.env.FLASK_API_URL || "http://localhost:5000";
  try {
    const { personalInfo, experience, education, skills } = await req.json();
    // Compose a text block for summarization
    const text = `Personal Info: ${JSON.stringify(personalInfo)}\nExperience: ${JSON.stringify(experience)}\nEducation: ${JSON.stringify(education)}\nSkills: ${skills.join(", ")}`;
    const response = await fetch(FLASK_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
    }
    const data = await response.json();
    return NextResponse.json({ summary: data.summary });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 