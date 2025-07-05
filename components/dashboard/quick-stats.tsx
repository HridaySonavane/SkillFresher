"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Sparkles, TrendingUp } from "lucide-react";

interface QuickStatsProps {
	usage: {
		resumes_created: number;
		downloads_used: number;
		ai_optimizations_used: number;
	} | null;
	subscription: {
		plan_id: string;
		status: string;
	} | null;
}

export function QuickStats({ usage, subscription }: QuickStatsProps) {
	const stats = [
		{
			title: "Resumes Created",
			value: usage?.resumes_created || 0,
			icon: FileText,
			color: "text-blue-600",
			bgColor: "bg-blue-100",
		},
		{
			title: "Downloads Used",
			value: usage?.downloads_used || 0,
			icon: Download,
			color: "text-green-600",
			bgColor: "bg-green-100",
		},
		{
			title: "AI Optimizations",
			value: usage?.ai_optimizations_used || 0,
			icon: Sparkles,
			color: "text-purple-600",
			bgColor: "bg-purple-100",
		},
		{
			title: "Plan Status",
			value: subscription?.status === "active" ? "Active" : "Free",
			icon: TrendingUp,
			color:
				subscription?.status === "active"
					? "text-green-600"
					: "text-gray-600",
			bgColor:
				subscription?.status === "active"
					? "bg-green-100"
					: "bg-gray-100",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{stats.map((stat, index) => (
				<Card key={index}>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							{stat.title}
						</CardTitle>
						<div className={`p-2 rounded-full ${stat.bgColor}`}>
							<stat.icon className={`h-4 w-4 ${stat.color}`} />
						</div>
					</CardHeader>
					<CardContent>
						<div className={`text-2xl font-bold ${stat.color}`}>
							{stat.value}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
