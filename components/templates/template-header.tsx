"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Download } from "lucide-react";
import Link from "next/link";

export function TemplateHeader() {
	return (
		<div className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex items-center gap-4 mb-6">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Home
						</Link>
					</Button>
				</div>

				<div className="text-center max-w-3xl mx-auto">
					<div className="flex items-center justify-center gap-2 mb-4">
						<Badge
							variant="secondary"
							className="bg-blue-100 text-blue-800"
						>
							50+ Templates
						</Badge>
						<Badge
							variant="secondary"
							className="bg-green-100 text-green-800"
						>
							ATS-Optimized
						</Badge>
					</div>

					<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
						Professional Resume Templates
					</h1>

					<p className="text-xl text-gray-600 mb-8">
						Choose from our collection of professionally designed,
						ATS-friendly resume templates. Each template is crafted
						to help you stand out and land your dream job.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="text-lg px-8 py-3" asChild>
							<Link href="/auth/signup">
								<Sparkles className="w-5 h-5 mr-2" />
								Start Building
							</Link>
						</Button>
					</div>

					<div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500">
						<div className="flex items-center gap-2">
							<Download className="w-4 h-4" />
							<span>10K+ Downloads</span>
						</div>
						<div className="flex items-center gap-2">
							<Sparkles className="w-4 h-4" />
							<span>AI-Enhanced</span>
						</div>
						<div>
							<span>95% ATS Pass Rate</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
