import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/stripe-server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => cookies() });
    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's subscription from database
    const { data: subscription } = await supabase.from("user_subscriptions").select("*").eq("user_id", user.id).single()

    if (!subscription) {
      return NextResponse.json({
        subscription: null,
        planId: "free",
        status: "inactive",
      })
    }

    // Check if subscription is still active in Stripe
    try {
      const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id)

      // Update local database if status changed
      if (stripeSubscription.status !== subscription.status) {
        await supabase
          .from("user_subscriptions")
          .update({
            status: stripeSubscription.status,
            updated_at: new Date().toISOString(),
          })
          .eq("id", subscription.id)

        // Update user profile if subscription is canceled
        if (stripeSubscription.status === "canceled" || stripeSubscription.status === "incomplete_expired") {
          await supabase.from("user_profiles").update({ subscription_tier: "free" }).eq("id", user.id)
        }
      }

      return NextResponse.json({
        subscription: {
          ...subscription,
          status: stripeSubscription.status,
        },
        planId: stripeSubscription.status === "active" ? subscription.plan_id : "free",
        status: stripeSubscription.status,
      })
    } catch (stripeError) {
      // If subscription doesn't exist in Stripe, mark as canceled
      await supabase
        .from("user_subscriptions")
        .update({
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("id", subscription.id)

      await supabase.from("user_profiles").update({ subscription_tier: "free" }).eq("id", user.id)

      return NextResponse.json({
        subscription: null,
        planId: "free",
        status: "canceled",
      })
    }
  } catch (error: any) {
    console.error("Check subscription error:", error)
    return NextResponse.json({ error: "Failed to check subscription" }, { status: 500 })
  }
}
