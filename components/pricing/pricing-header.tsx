"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

export function PricingHeader() {
	return (
		<div className="bg-white border-b border-gray-200 dark:bg-neutral-900 dark:border-neutral-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex items-center gap-4 mb-8">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Home
						</Link>
					</Button>
				</div>

				<div className="text-center max-w-4xl mx-auto">
					<Badge
						variant="secondary"
						className="bg-green-100 dark:bg-green-300 dark:text-green-950 text-green-800 mb-4"
					>
						<Zap className="w-4 h-4 mr-1" />
						30-Day Money Back Guarantee
					</Badge>

					<h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-200 mb-6">
						Simple, transparent pricing
					</h1>

					<p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
						Start free and upgrade when you need more features. No
						hidden fees, no surprises. Cancel anytime.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
						<div className="flex items-center gap-3 text-left">
							<CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
							<span className="text-gray-700 dark:text-gray-500">
								No setup fees
							</span>
						</div>
						<div className="flex items-center gap-3 text-left">
							<CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
							<span className="text-gray-700 dark:text-gray-500">
								Cancel anytime
							</span>
						</div>
						<div className="flex items-center gap-3 text-left">
							<CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
							<span className="text-gray-700 dark:text-gray-500">
								24/7 support
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
