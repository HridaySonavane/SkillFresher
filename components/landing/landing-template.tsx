// import { PricingTable } from "@/components/subscription/pricing-table";
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function LandingTemplate() {
	const templates = [
		{
			image: "/project%20image/resume%20%281%29_page-0001.jpg",
		},
		{
			image: "/project%20image/resume%20%282%29_page-0001.jpg",
		},
		{
			image: "/project%20image/resume%20%283%29_page-0001.jpg",
		},
		{
			image: "/project%20image/resume%20%284%29_page-0001.jpg",
		},
		{
			image: "/project%20image/resume%20%285%29_page-0001.jpg",
		},
		{
			image: "/project%20image/resume%20%286%29_page-0001.jpg",
		},
		{
			image: "/project%20image/resume%20%287%29_page-0001.jpg",
		},
		{
			image: "/project%20image/resume%20%288%29_page-0001.jpg",
		},
		{
			image: "/project%20image/resume%20%289%29_page-0001.jpg",
		},
		{
			image: "/project%20image/resume-10.jpg",
		},
	];

	const sliderVariant = {
		initial: {
			x: "50%",
		},
		animate: {
			x: "-220%",
			transition: {
				duration: 50,
				repeat: Infinity,
				repeatType: "mirror" as const,
			},
		},
	};

	return (
		<section id="pricing" className="h-screen max-w-full px-4">
			<div className="container relative mx-auto w-full h-full overflow-hidden flex flex-col items-center sm:block">
				{/* Responsive stacking: text above slider on mobile, original layout on desktop */}
				<div className="flex-1/3 lg:flex-1 flex flex-col lg:flex-row w-full h-full">
					{/* text section */}
					<div className="flex-1/2 w-full h-full flex flex-col items-baseline justify-center dark:bg-gray-950 bg-[#f0eeeb]">
						<div className="max-w-xl text-center lg:ml-20">
							<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">
								Free Resume Templates
							</h2>
							<p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
								Stop worrying about formatting—our modern,
								ATS-ready templates help you create a
								professional resume that stands out at any
								career level.
							</p>
						</div>
					</div>
					<div className="hidden lg:block flex-1/2 bg-gradient-to-r from-[#f0eeeb] dark:from-gray-950 to-25% to-transparent"></div>
				</div>
				<div className="flex-2/3 lg:absolute lg:top-0 relative -z-10 w-full h-full">
					{/* slider section - always below text on mobile/tablet, original position on desktop */}
					<motion.div
						className="absolute left-0 top-0 w-full h-full flex items-center justify-between gap-6 -z-10 lg:static lg:py-20 sm:py-0 lg:mt-0 mt-0"
						variants={sliderVariant}
						initial="initial"
						animate="animate"
					>
						{templates.map((template, i) => (
							<Image
								key={i}
								src={template.image}
								alt="template"
								width={1000}
								height={1000}
								className="object-contain w-full h-full"
							/>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
