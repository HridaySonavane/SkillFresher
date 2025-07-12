import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    // const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies})

    // Get the current user
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession()

    if (authError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // For now, return mock data
    // In production, you would query your database for actual usage data
    // const mockUsage = {
    //   // resumes_created: Math.floor(Math.random() * 10),
    //   // downloads_used: Math.floor(Math.random() * 15),
    //   // ai_optimizations_used: Math.floor(Math.random() * 5),
    // }

    const resumesCreatedRes = await supabase
      .from("resumes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", session.user.id);

    const downloadsUsedRes = await supabase
      .from("resumes")
      .select("download_count")
      .eq("user_id", session.user.id);

    const aiOptimizationsUsedRes = await supabase
      .from("ai_optimizations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", session.user.id);

    const resumeData = {
      resumes_created: resumesCreatedRes.count ?? 0,
      downloads_used: downloadsUsedRes.data?.reduce((sum, row) => sum + (row.download_count || 0), 0) ?? 0,
      ai_optimizations_used: aiOptimizationsUsedRes.count ?? 0,
    };
    
    return NextResponse.json(resumeData, { status: 200 })
  } catch (error) {
    console.error("Error fetching usage data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
