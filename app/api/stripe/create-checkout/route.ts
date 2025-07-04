import { type NextRequest, NextResponse } from "next/server"
import { StripeService } from "@/lib/stripe/stripe-service"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()

    // Get authenticated user
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    // Create or get Stripe customer
    let customerId = profile.stripe_customer_id

    if (!customerId) {
      const customer = await StripeService.createCustomer(user.id, user.email!, profile.full_name)
      customerId = customer.id
    }

    // Create checkout session
    const session = await StripeService.createCheckoutSession(
      customerId,
      priceId,
      `${request.nextUrl.origin}/dashboard?success=true`,
      `${request.nextUrl.origin}/pricing?canceled=true`,
    )

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
