// Stripe configuration
export const stripeConfig = {
  currency: "usd",
  payment_method_types: ["card"],
  billing_address_collection: "required",
  customer_update: {
    address: "auto",
    name: "auto",
  },
} as const

// Subscription plans configuration
export const stripePlans = {
  free: {
    priceId: null, // Free plan doesn't need Stripe price
    name: "Free",
    features: ["1 resume", "3 AI optimizations", "5 downloads"],
  },
  professional: {
    priceId: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_YEARLY_PRICE_ID!,
    },
    name: "Professional",
    features: ["5 resumes", "25 AI optimizations", "50 downloads"],
  },
  premium: {
    priceId: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID!,
    },
    name: "Premium",
    features: ["Unlimited resumes", "Unlimited AI", "Unlimited downloads"],
  },
  enterprise: {
    priceId: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
      yearly: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID!
    },
    name: "Enterprise",
    features: ["Everything + Team features", "API access", "Priority support"],
  },
} as const
