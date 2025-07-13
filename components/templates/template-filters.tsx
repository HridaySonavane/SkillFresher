"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

export function TemplateFilters() {
	const [filters, setFilters] = useState({
		pricing: [],
		experience: [],
		industry: [],
		features: [],
	});

	const filterOptions = {
		pricing: [
			{ id: "free", label: "Free", count: 12 },
			{ id: "premium", label: "Premium", count: 40 },
		],
		experience: [
			{ id: "entry", label: "Entry Level", count: 25 },
			{ id: "mid", label: "Mid Level", count: 35 },
			{ id: "senior", label: "Senior Level", count: 28 },
			{ id: "executive", label: "Executive", count: 15 },
		],
		industry: [
			{ id: "technology", label: "Technology", count: 15 },
			{ id: "finance", label: "Finance", count: 12 },
			{ id: "healthcare", label: "Healthcare", count: 8 },
			{ id: "marketing", label: "Marketing", count: 10 },
			{ id: "education", label: "Education", count: 7 },
		],
		features: [
			{ id: "ats-optimized", label: "ATS Optimized", count: 52 },
			{ id: "ai-enhanced", label: "AI Enhanced", count: 40 },
			{ id: "photo-ready", label: "Photo Ready", count: 25 },
			{ id: "cover-letter", label: "Cover Letter Included", count: 30 },
		],
	};

	const clearAllFilters = () => {
		setFilters({
			pricing: [],
			experience: [],
			industry: [],
			features: [],
		});
	};

	const hasActiveFilters = Object.values(filters).some(
		(arr) => arr.length > 0
	);

	return (
		<div className="space-y-6 dark:bg-gray-950">
			<Card className="dark:bg-input/20">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2">
							<Filter className="w-5 h-5" />
							Filters
						</CardTitle>
						{hasActiveFilters && (
							<Button
								variant="ghost"
								size="sm"
								onClick={clearAllFilters}
							>
								<X className="w-4 h-4 mr-1" />
								Clear
							</Button>
						)}
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Pricing */}
					<div>
						<h4 className="font-medium mb-3">Pricing</h4>
						<div className="space-y-2">
							{filterOptions.pricing.map((option) => (
								<div
									key={option.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center space-x-2">
										<Checkbox id={option.id} />
										<label
											htmlFor={option.id}
											className="text-sm"
										>
											{option.label}
										</label>
									</div>
									<Badge
										variant="secondary"
										className="text-xs"
									>
										{option.count}
									</Badge>
								</div>
							))}
						</div>
					</div>

					{/* Experience Level */}
					<div>
						<h4 className="font-medium mb-3">Experience Level</h4>
						<div className="space-y-2">
							{filterOptions.experience.map((option) => (
								<div
									key={option.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center space-x-2">
										<Checkbox id={option.id} />
										<label
											htmlFor={option.id}
											className="text-sm"
										>
											{option.label}
										</label>
									</div>
									<Badge
										variant="secondary"
										className="text-xs"
									>
										{option.count}
									</Badge>
								</div>
							))}
						</div>
					</div>

					{/* Industry */}
					<div>
						<h4 className="font-medium mb-3">Industry</h4>
						<div className="space-y-2">
							{filterOptions.industry.map((option) => (
								<div
									key={option.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center space-x-2">
										<Checkbox id={option.id} />
										<label
											htmlFor={option.id}
											className="text-sm"
										>
											{option.label}
										</label>
									</div>
									<Badge
										variant="secondary"
										className="text-xs"
									>
										{option.count}
									</Badge>
								</div>
							))}
						</div>
					</div>

					{/* Features */}
					<div>
						<h4 className="font-medium mb-3">Features</h4>
						<div className="space-y-2">
							{filterOptions.features.map((option) => (
								<div
									key={option.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center space-x-2">
										<Checkbox id={option.id} />
										<label
											htmlFor={option.id}
											className="text-sm"
										>
											{option.label}
										</label>
									</div>
									<Badge
										variant="secondary"
										className="text-xs"
									>
										{option.count}
									</Badge>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Quick Actions */}
			<Card className="dark:bg-input/20">
				<CardHeader>
					<CardTitle className="text-lg">Quick Actions</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<Button
						variant="outline"
						className="w-full justify-start bg-transparent"
					>
						View Free Templates Only
					</Button>
					<Button
						variant="outline"
						className="w-full justify-start bg-transparent"
					>
						Most Popular Templates
					</Button>
					<Button
						variant="outline"
						className="w-full justify-start bg-transparent"
					>
						Recently Added
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
