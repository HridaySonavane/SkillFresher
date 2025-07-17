"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function LandingTestimonial() {
	const testimonials = {
		section1: [
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
		],
		section2: [
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
		],
		section3: [
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
		],
	};

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
		<section id="pricing" className="h-screen mx-20 mb-20">
			<div className="container h-full flex flex-col pb-20">
				<div className="flex-1/5 flex flex-col items-center justify-center">
					<div className="max-w-[45rem] flex flex-col items-center">
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">
							Testimonials
						</h2>
						<p className="text-center text-sm italic text-gray-600 dark:text-gray-400">
							We always love to hear from the users of Reactive
							Resume with feedback or support. Here are some of
							the messages we've received. If you have any
							feedback, feel free to drop us an email at
							hello@amruthpillai.com.
						</p>
					</div>
				</div>
				<div className="flex-4/5 h-full grid grid-cols-3 gap-10 mt-10">
					<div className="grid grid-cols-1 grid-rows-7 grid-flow-col gap-10">
						{testimonials.section1.map((testimonial, i) => (
							<div
								key={i}
								className={`bg-card dark:bg-neutral-800/60 rounded-lg row-span-${i === 1 ? 3 : 2}`}
							>
								<div className="p-6">
									<p>{testimonial.desc}</p>
									<h3>{testimonial.name}</h3>
								</div>
							</div>
						))}
					</div>
					<div className="grid grid-cols-1 grid-rows-10 grid-flow-col gap-6">
						{testimonials.section2.map((testimonial, i) => (
							<div
								key={i}
								className="bg-card dark:bg-neutral-800/60 rounded-lg row-span-4"
							>
								<div className="p-6">
									<p>{testimonial.desc}</p>
									<h3>{testimonial.name}</h3>
								</div>
							</div>
						))}
					</div>
					<div className="grid grid-cols-1 grid-rows-7 grid-flow-col gap-6">
						{testimonials.section3.map((testimonial, i) => (
							<div
								key={i}
								className={`bg-card dark:bg-neutral-800/60 rounded-lg row-span-${i === 1 ? 3 : 2}`}
							>
								<div className="p-6">
									<p>{testimonial.desc}</p>
									<h3>{testimonial.name}</h3>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
