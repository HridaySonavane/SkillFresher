import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

const features = [
  {
    category: "Resume Creation",
    items: [
      { name: "Number of resumes", free: "1", professional: "5", premium: "Unlimited", enterprise: "Unlimited" },
      {
        name: "Template access",
        free: "3 basic",
        professional: "15+ premium",
        premium: "All templates",
        enterprise: "All + custom",
      },
      { name: "AI optimizations/month", free: "3", professional: "25", premium: "Unlimited", enterprise: "Unlimited" },
      { name: "Downloads/month", free: "5", professional: "50", premium: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Export & Formats",
    items: [
      { name: "PDF export", free: true, professional: true, premium: true, enterprise: true },
      { name: "DOCX export", free: false, professional: true, premium: true, enterprise: true },
      { name: "TXT export", free: false, professional: false, premium: true, enterprise: true },
      { name: "Custom formats", free: false, professional: false, premium: false, enterprise: true },
    ],
  },
  {
    category: "AI Features",
    items: [
      { name: "Basic ATS scoring", free: true, professional: true, premium: true, enterprise: true },
      { name: "Advanced ATS analysis", free: false, professional: true, premium: true, enterprise: true },
      { name: "Job matching", free: false, professional: true, premium: true, enterprise: true },
      { name: "Cover letter generation", free: false, professional: true, premium: true, enterprise: true },
      { name: "Interview prep", free: false, professional: false, premium: true, enterprise: true },
    ],
  },
  {
    category: "Collaboration & Sharing",
    items: [
      { name: "Public resume sharing", free: true, professional: true, premium: true, enterprise: true },
      { name: "Team collaboration", free: false, professional: false, premium: false, enterprise: true },
      { name: "White-label options", free: false, professional: false, premium: false, enterprise: true },
      { name: "API access", free: false, professional: false, premium: false, enterprise: true },
    ],
  },
  {
    category: "Support",
    items: [
      { name: "Email support", free: "Basic", professional: "Priority", premium: "Priority", enterprise: "Dedicated" },
      { name: "Phone support", free: false, professional: false, premium: true, enterprise: true },
      { name: "Live chat", free: false, professional: true, premium: true, enterprise: true },
      { name: "Account manager", free: false, professional: false, premium: false, enterprise: true },
    ],
  },
]

export function PricingComparison() {
  const renderFeatureValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-300 mx-auto" />
      )
    }
    return <span className="text-sm text-gray-700">{value}</span>
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare all features</h2>
          <p className="text-xl text-gray-600">See exactly what's included in each plan</p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-white">
            <div className="grid grid-cols-5 gap-4">
              <div></div>
              <div className="text-center">
                <CardTitle className="text-lg">Free</CardTitle>
              </div>
              <div className="text-center">
                <CardTitle className="text-lg">Professional</CardTitle>
              </div>
              <div className="text-center">
                <CardTitle className="text-lg">Premium</CardTitle>
              </div>
              <div className="text-center">
                <CardTitle className="text-lg">Enterprise</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {features.map((category, categoryIndex) => (
              <div key={category.category}>
                <div className="bg-gray-100 px-6 py-3 border-t">
                  <h3 className="font-semibold text-gray-900">{category.category}</h3>
                </div>
                {category.items.map((item, itemIndex) => (
                  <div
                    key={item.name}
                    className={`grid grid-cols-5 gap-4 px-6 py-4 border-t border-gray-100 ${
                      itemIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-center">{renderFeatureValue(item.free)}</div>
                    <div className="text-center">{renderFeatureValue(item.professional)}</div>
                    <div className="text-center">{renderFeatureValue(item.premium)}</div>
                    <div className="text-center">{renderFeatureValue(item.enterprise)}</div>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
