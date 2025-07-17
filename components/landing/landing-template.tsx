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
		<section id="pricing" className="h-screen">
			<div className="container relative mx-auto w-full h-full overflow-hidden">
				{/* text container */}
				<div className="w-full h-full flex flex-col items-baseline justify-center bg-gradient-to-r from-[#f0eeeb] dark:from-gray-950 via-50% via-[#f0eeeb] dark:via-gray-950 to-55% to-transparent">
					{/* text section */}
					<div className="max-w-xl text-center ml-20">
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">
							Free Resume Templates
						</h2>
						<p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
							Stop worrying about formatting—our modern, ATS-ready
							templates help you create a professional resume that
							stands out at any career level.
						</p>
					</div>
				</div>
				<motion.div
					className="absolute left-0 top-0 py-20 w-full h-full flex items-center justify-between gap-6 -z-10"
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
							// fill
							className="object-contain w-full h-full"
							// sizes="100%"
						/>
						// <div key={i} className="aspe w-fit h-full bg-blue-400">
						// </div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
