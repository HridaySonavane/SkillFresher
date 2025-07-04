"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Star, Zap, Users } from "lucide-react"

interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  limitations: string[]
  popular?: boolean
  icon: React.ReactNode
}

const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: <Star className="w-5 h-5" />,
    features: [
      "1 resume",
      "3 basic templates",
      "3 AI optimizations/month",
      "5 downloads/month",
      "PDF format",
      "Basic ATS scoring",
    ],
    limitations: ["Limited templates", "No DOCX export", "Basic support"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "For active job seekers",
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    popular: true,
    icon: <Zap className="w-5 h-5" />,
    features: [
      "5 resumes",
      "15+ premium templates",
      "25 AI optimizations/month",
      "50 downloads/month",
      "PDF + DOCX formats",
      "Advanced ATS analysis",
      "Job matching",
      "Cover letter generation",
    ],
    limitations: [],
  },
  {
    id: "premium",
    name: "Premium",
    description: "For serious professionals",
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    icon: <Check className="w-5 h-5" />,
    features: [
      "Unlimited resumes",
      "All premium templates",
      "Unlimited AI optimizations",
      "Unlimited downloads",
      "All formats",
      "Priority AI processing",
      "Advanced analytics",
      "LinkedIn integration",
      "Interview prep tools",
    ],
    limitations: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams and organizations",
    monthlyPrice: 49.99,
    yearlyPrice: 499.99,
    icon: <Users className="w-5 h-5" />,
    features: [
      "Everything in Premium",
      "Team collaboration",
      "White-label options",
      "API access",
      "Custom templates",
      "Bulk operations",
      "Advanced reporting",
      "Dedicated support",
    ],
    limitations: [],
  },
]

export function PricingTable() {
  const [isYearly, setIsYearly] = useState(false)

  const handleSubscribe = async (planId: string) => {
    // Implement subscription logic
    console.log(`Subscribing to ${planId}`)
  }

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 mb-6">Start free, upgrade when you need more features</p>

        <div className="flex items-center justify-center gap-4">
          <span className={!isYearly ? "font-semibold" : "text-gray-500"}>Monthly</span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={isYearly ? "font-semibold" : "text-gray-500"}>
            Yearly
            <Badge variant="secondary" className="ml-2">
              Save 17%
            </Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
            )}

            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {plan.icon}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>

              <div className="mt-4">
                <div className="text-3xl font-bold">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  {plan.monthlyPrice > 0 && (
                    <span className="text-sm font-normal text-gray-500">/{isYearly ? "year" : "month"}</span>
                  )}
                </div>
                {isYearly && plan.monthlyPrice > 0 && (
                  <div className="text-sm text-gray-500">
                    ${(plan.yearlyPrice / 12).toFixed(2)}/month billed annually
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.id)}
              >
                {plan.id === "free" ? "Get Started" : "Subscribe"}
              </Button>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Features included:</h4>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {plan.limitations.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-semibold text-sm text-gray-500">Limitations:</h4>
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-4 h-4 text-center">•</span>
                      <span>{limitation}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
