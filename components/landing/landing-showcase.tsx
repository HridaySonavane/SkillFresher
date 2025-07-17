"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const Counter = ({ from = 0, to = 650000, duration = 2 }) => {
	const count = useMotionValue(from);
	const rounded = useTransform(count, (latest) =>
		Math.floor(latest).toLocaleString()
	);
	const [display, setDisplay] = useState("0");

	useEffect(() => {
		const controls = animate(count, to, {
			duration,
			onUpdate: (latest) => {
				setDisplay(Math.floor(latest).toLocaleString());
			},
		});

		return controls.stop; // Cleanup on unmount
	}, [count, to, duration]);

	return <motion.span>{display}+</motion.span>;
};

const logos = [
	{
		logo: "/google-wordmark.svg",
		name: "google",
	},
	{
		logo: "/postman.svg",
		name: "postman",
	},
	{
		logo: "/twilio.svg",
		name: "twilio",
	},
	{
		logo: "/Cursor_wordmark_dark.svg",
		name: "cursor",
	},
	{
		logo: "/algolia.svg",
		name: "algolia",
	},
];

export function LandingShowcase() {
	return (
		<section className="h-[80vh] mx-20">
			<div className="container h-full flex flex-col items-center justify-center gap-12">
				<div className="flex-2/3 w-full flex flex-col justify-center items-center gap-12">
					<h3>
						Reactive Resume has helped people land jobs at these
						great companies:
					</h3>
					<div className="flex justify-between items-center gap-6">
						{logos.map((logo, i) => (
							<div
								key={i}
								className="relative aspect-video w-56 h-32"
							>
								<Image
									src={logo.logo}
									// width={1000}
									// height={1000}
									fill
									alt={logo.name}
									className="object-contain"
								/>
							</div>
						))}
						{/* <div>company</div>
						<div>company</div>
						<div>company</div>
						<div>company</div> */}
					</div>
					<p className="text-[13px] text-gray-200 max-w-md text-center">
						If this app has helped you with your job hunt, let me
						know by reaching out through this contact form.
					</p>
				</div>

				<div className="flex-1/3 flex justify-between items-baseline gap-x-36">
					<div className="text-gray-200 text-5xl text-center py-4 font-bold">
						<Counter to={27000} />
						<p className="text-base text-gray-600 m-2.5">
							GitHub Stars
						</p>
					</div>
					<div className="text-white text-6xl text-center py-4 font-bold">
						<Counter to={650000} />
						<p className="text-base text-gray-400 m-2.5">
							Users Signed Up
						</p>
					</div>
					<div className="text-gray-200 text-5xl text-center font-bold">
						<Counter to={840000} />
						<p className="text-base text-gray-600 m-2.5">
							Users Signed Up
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
