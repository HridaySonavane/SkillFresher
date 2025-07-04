import { PricingTable } from "@/components/subscription/pricing-table"

export function LandingPricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade when you need more features. No hidden fees, no surprises.
          </p>
        </div>
        <PricingTable />
      </div>
    </section>
  )
}
