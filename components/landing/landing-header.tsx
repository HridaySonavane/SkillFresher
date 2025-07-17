"use client";

import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../themeChanger";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect } from "react";

export function LandingHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const svgControls = useAnimation();
	const contentControls = useAnimation();

	useEffect(() => {
		const sequence = async () => {
			if (isHovered) {
				await svgControls.start({
					opacity: 0,
					scale: 0.8,
					transition: { duration: 0.18 },
				});
				setExpanded(true); // triggers header expansion (layout)
				await new Promise((res) => setTimeout(res, 220)); // wait for expansion
				await contentControls.start({
					opacity: 1,
					y: 0,
					transition: { duration: 0.22 },
				});
			} else {
				await contentControls.start({
					opacity: 0,
					y: 20,
					transition: { duration: 0.18 },
				});
				setExpanded(false); // triggers header contraction (layout)
				await new Promise((res) => setTimeout(res, 220)); // wait for contraction
				await svgControls.start({
					opacity: 1,
					scale: 1,
					transition: { duration: 0.22 },
				});
			}
		};
		sequence();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isHovered]);

	return (
		<>
			{/* Donation Banner */}
			<div className="bg-gray-900 dark:bg-gray-950/70 text-white text-sm py-2 px-4 text-center">
				<div className="flex items-center justify-center gap-2">
					<Heart className="w-4 h-4 text-red-400" />
					<span>
						If this project has helped you, please consider
						supporting us as we&apos;re building the future of
						AI-powered resume creation.
					</span>
				</div>
			</div>

			<div className="w-full flex justify-center items-center">
				<motion.header
					className="bg-white/70 m-8 dark:bg-gray-950/70 backdrop-blur-md border-b border-gray-300 dark:border-none fixed top-6 z-50 py-3 sm:px-6 rounded-xl shadow-md shadow-neutral-300/20 dark:shadow-gray-800/50 flex items-center"
					layout
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
				>
					{/* SVG Logo - animated out first */}
					<motion.div
						initial={{ opacity: 1, scale: 1 }}
						animate={svgControls}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<svg
							width="50"
							height="50"
							viewBox="0 0 85 85"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M42.5 20 
       C44 20 45 21 45.7 22.3 
       L65 42.5 
       C66 44 66 45 65 46.5 
       L45.7 65.7 
       C45 67 44 68 42.5 68 
       C41 68 40 67 39.3 65.7 
       L20 46.5 
       C19 45 19 44 20 42.5 
       L39.3 22.3 
       C40 21 41 20 42.5 20Z"
								// fill="white"
								className={`fill-black dark:fill-white`}
							/>
						</svg>
					</motion.div>

					{/* Logo Text (AI) - always visible in compact, hidden in expanded */}
					<AnimatePresence>
						{expanded && (
							<motion.div
								className="flex items-center"
								initial={{ opacity: 0, y: 20 }}
								animate={contentControls}
								exit={{
									opacity: 0,
									y: 20,
									transition: { duration: 0.18 },
								}}
							>
								<div className="flex-shrink-0">
									<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
										<span className="text-white font-bold text-sm">
											AI
										</span>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Header Content - appears after expansion */}
					<AnimatePresence>
						{expanded && (
							<motion.div
								className="flex-1 flex justify-between items-center gap-8 h-14 ml-8"
								initial={{ opacity: 0, y: 20 }}
								animate={contentControls}
								exit={{
									opacity: 0,
									y: 20,
									transition: { duration: 0.18 },
								}}
								style={{
									pointerEvents: expanded ? "auto" : "none",
								}}
							>
								<div className="flex items-center">
									<div className="ml-3">
										<h1 className="text-xl font-bold text-gray-900 dark:text-gray-300">
											SkillFresher
										</h1>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											AI-Powered Resume Builder
										</p>
									</div>
								</div>
								<nav className="hidden md:flex space-x-8 ">
									<a
										href="#features"
										className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
									>
										Features
									</a>
									<a
										href="./templete"
										className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
									>
										Templates
									</a>
									<a
										href="./pricing"
										className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
									>
										Pricing
									</a>
									<a
										href="#about"
										className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
									>
										About
									</a>
								</nav>
								<div className="hidden md:flex items-center space-x-4">
									<Button
										className="dark:bg-gray-800/85"
										variant="secondary"
										asChild
									>
										<a href="/auth/signin">Sign In</a>
									</Button>
									<Button asChild>
										<a href="/auth/signup">Get Started</a>
									</Button>
									<ModeToggle />
								</div>
								<div className="md:hidden">
									<Button
										variant="ghost"
										size="sm"
										onClick={() =>
											setMobileMenuOpen(!mobileMenuOpen)
										}
										aria-label="Toggle menu"
									>
										{mobileMenuOpen ? (
											<X className="w-5 h-5" />
										) : (
											<Menu className="w-5 h-5" />
										)}
									</Button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.header>
			</div>
		</>
	);
}
