"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Star, Crown, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export function TemplateGallery() {
	const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
		null
	);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const [templates, setTemplates] = useState<any[]>([]);

	useEffect(() => {
		fetch("/api/templates?offset=" + templates.length)
			.then((res) => res.json())
			.then(setTemplates);
	}, []);

	// const handlePreview = (templateId: string) => {
	// 	setSelectedTemplate(templateId);
	// 	// Open preview modal or navigate to preview page
	// };

	const loadMoreTemplates = () => {
		// Fetch more templates from the API
		fetch("/api/templates?offset=" + templates.length)
			.then((res) => res.json())
			.then((newTemplates) => {
				setTemplates((prev) => [...prev, ...newTemplates]);
			});
	};

	const handleUseTemplate = (templateId: string) => {
		// Navigate to builder with selected template
		window.location.href = `/builder?template=${templateId}`;
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						All Templates
					</h2>
					<p className="text-gray-600">
						{templates.length} professional templates available
					</p>
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant={viewMode === "grid" ? "default" : "outline"}
						size="sm"
						onClick={() => setViewMode("grid")}
					>
						Grid
					</Button>
					<Button
						variant={viewMode === "list" ? "default" : "outline"}
						size="sm"
						onClick={() => setViewMode("list")}
					>
						List
					</Button>
				</div>
			</div>

			{/* Templates Grid */}
			<div
				className={
					viewMode === "grid"
						? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						: "space-y-4"
				}
			>
				{templates.map((template) => (
					<Card
						key={template.id}
						className="group hover:shadow-lg transition-shadow duration-300"
					>
						<CardContent className="p-0 flex flex-col h-full">
							{/* Template Preview */}
							<div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-gray-100">
								<Image
									src={template.preview || "/placeholder.svg"}
									alt={template.name}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
								/>

								{/* Overlay */}
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

								{/* Action Buttons */}
								<div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									{/* <Button
										size="sm"
										variant="secondary"
										onClick={() =>
											handlePreview(template.id)
										}
									>
										<Eye className="w-4 h-4 mr-1" />
										Preview
									</Button> */}
									<Dialog>
										<DialogTrigger className="flex items-center justify-center w-full h-full bg-transparent">
											<div className="bg-[#f5f5f5] py-2 px-2.5 rounded-md flex items-center border border-gray-400 border-b-2 shadow-xs cursor-pointer hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
												<Eye className="w-5 h-5 mr-1" />
												Preview
											</div>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													{template.name} - Preview
												</DialogTitle>
												<DialogDescription>
													{template.description}
												</DialogDescription>
											</DialogHeader>
											<div className="relative aspect-[8/9] overflow-hidden rounded-lg bg-gray-100">
												{template.preview && (
													<Image
														src={"/public/image"}
														alt="Template Preview"
														fill
														className="border border-red-500"
													/>
												)}
											</div>
											<Button
											// size="sm"
											>
												<Link href="/auth/signup">
													Use Template
												</Link>
											</Button>
										</DialogContent>
									</Dialog>
								</div>

								{/* Premium Badge */}
								{template.is_premium && (
									<Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900">
										<Crown className="w-3 h-3 mr-1" />
										Premium
									</Badge>
								)}

								{/* Category Badge */}
								<Badge
									variant="secondary"
									className="absolute top-3 left-3"
								>
									{template.category}
								</Badge>
							</div>

							{/* Template Info */}
							<div className="p-4 space-y-3">
								<div>
									<h3 className="font-semibold text-lg text-gray-900">
										{template.name}
									</h3>
									<p className="text-sm text-gray-600 mt-1 truncate">
										{template.description}
									</p>
								</div>

								{/* Stats */}
								<div className="flex items-center justify-between text-sm text-gray-500">
									<div className="flex items-center gap-4">
										<div className="flex items-center gap-1">
											<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
											<span>{template.rating}</span>
										</div>
										<div className="flex items-center gap-1">
											<Download className="w-4 h-4" />
											<span>
												{template.usage_count.toLocaleString()}
											</span>
										</div>
									</div>
									<div className="text-xl text-black font-semibold">
										{template.is_premium
											? "$" +
												`${template.price_cents}` +
												"/month"
											: "Free"}
									</div>
								</div>

								{/* Actions */}
								<div className="flex gap-2 pt-2">
									{/* <Button
										variant="outline"
										size="sm"
										className="flex-1 bg-transparent"
										onClick={() =>
											handlePreview(template.id)
										}
									>
										<Eye className="w-4 h-4 mr-1" />
										Preview
									</Button> */}
									<Button
										size="sm"
										className="flex-1 cursor-pointer"
										onClick={() =>
											handleUseTemplate(template.id)
										}
									>
										{template.is_premium ? (
											<>
												<Crown className="w-4 h-4 mr-1" />
												Use Premium
											</>
										) : (
											<>
												<Sparkles className="w-4 h-4 mr-1" />
												Use Free
											</>
										)}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Load More */}
			<div className="text-center pt-8">
				<Button
					variant="outline"
					size="lg"
					className="bg-transparent"
					onClick={loadMoreTemplates}
				>
					Load More Templates
				</Button>
			</div>
		</div>
	);
}
