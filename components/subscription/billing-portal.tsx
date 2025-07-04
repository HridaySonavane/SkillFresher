"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, DollarSign } from "lucide-react";

interface BillingPortalProps {
	subscription: {
		status: string;
		current_period_end: string;
		plan_name: string;
		amount: number;
	};
}

export function BillingPortal({ subscription }: BillingPortalProps) {
	const handleManageBilling = async () => {
		const response = await fetch("/api/stripe/create-portal", {
			method: "POST",
		});

		const { url } = await response.json();
		window.location.href = url;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<CreditCard className="w-5 h-5" />
					Billing & Subscription
				</CardTitle>
				<CardDescription>
					Manage your subscription and billing information
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium">Current Plan</span>
					<Badge
						variant={
							subscription.status === "active"
								? "default"
								: "secondary"
						}
					>
						{subscription.plan_name}
					</Badge>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-sm font-medium">Status</span>
					<Badge
						variant={
							subscription.status === "active"
								? "default"
								: "destructive"
						}
					>
						{subscription.status}
					</Badge>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-sm font-medium">
						Next Billing Date
					</span>
					<div className="flex items-center gap-1 text-sm">
						<Calendar className="w-4 h-4" />
						{new Date(
							subscription.current_period_end
						).toLocaleDateString()}
					</div>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-sm font-medium">Amount</span>
					<div className="flex items-center gap-1 text-sm">
						<DollarSign className="w-4 h-4" />$
						{(subscription.amount / 100).toFixed(2)}/month
					</div>
				</div>

				<Button onClick={handleManageBilling} className="w-full">
					Manage Billing
				</Button>
			</CardContent>
		</Card>
	);
}
