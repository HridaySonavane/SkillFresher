"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { CheckoutHeader } from "@/components/checkout/checkout-header";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface PlanDetails {
	id: string;
	name: string;
	price: number;
	interval: string;
	priceId: string;
	features: string[];
}

const plans: Record<string, PlanDetails> = {
	professional_monthly: {
		id: "professional",
		name: "Professional",
		price: 9.99,
		interval: "month",
		priceId:
			process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID || "",
		features: [
			"Unlimited resume downloads",
			"All premium templates",
			"AI-powered suggestions",
			"PDF & DOCX export",
			"Priority support",
		],
	},
	professional_yearly: {
		id: "professional",
		name: "Professional",
		price: 99.99,
		interval: "year",
		priceId:
			process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_YEARLY_PRICE_ID || "",
		features: [
			"Unlimited resume downloads",
			"All premium templates",
			"AI-powered suggestions",
			"PDF & DOCX export",
			"Priority support",
			"Save 17% with annual billing",
		],
	},
	premium_monthly: {
		id: "premium",
		name: "Premium",
		price: 19.99,
		interval: "month",
		priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID || "",
		features: [
			"Everything in Professional",
			"Cover letter generator",
			"LinkedIn optimization",
			"Interview preparation",
			"ATS optimization score",
			"Phone support",
		],
	},
	premium_yearly: {
		id: "premium",
		name: "Premium",
		price: 199.99,
		interval: "year",
		priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID || "",
		features: [
			"Everything in Professional",
			"Cover letter generator",
			"LinkedIn optimization",
			"Interview preparation",
			"ATS optimization score",
			"Phone support",
			"Save 17% with annual billing",
		],
	},
};

export default function CheckoutPage() {
	const searchParams = useSearchParams();
	const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
	const [currentStep, setCurrentStep] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const planParam = searchParams.get("plan");
		if (planParam && plans[planParam]) {
			setSelectedPlan(plans[planParam]);
		}
		setLoading(false);
	}, [searchParams]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (!selectedPlan) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<Card className="p-8 max-w-md mx-auto text-center">
					<AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
					<h2 className="text-xl font-semibold text-gray-900 mb-2">
						Invalid Plan Selected
					</h2>
					<p className="text-gray-600 mb-4">
						The selected plan could not be found. Please go back and
						select a valid plan.
					</p>
					<a
						href="/pricing"
						className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						Back to Pricing
					</a>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<CheckoutHeader />

			<div className="max-w-6xl mx-auto px-4 py-8">
				<CheckoutSteps currentStep={currentStep} />

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
					{/* Main Checkout Form */}
					<div className="lg:col-span-2">
						<CheckoutForm
							plan={selectedPlan}
							onStepChange={setCurrentStep}
						/>
					</div>

					{/* Order Summary Sidebar */}
					<div className="lg:col-span-1">
						<OrderSummary plan={selectedPlan} />
					</div>
				</div>
			</div>
		</div>
	);
}
