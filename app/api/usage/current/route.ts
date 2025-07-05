import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    // const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookies() })

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
    const mockUsage = {
      resumes_created: Math.floor(Math.random() * 10),
      downloads_used: Math.floor(Math.random() * 15),
      ai_optimizations_used: Math.floor(Math.random() * 5),
    }

    return NextResponse.json(mockUsage)
  } catch (error) {
    console.error("Error fetching usage data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
