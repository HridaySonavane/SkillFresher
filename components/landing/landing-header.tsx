"use client";

import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../themeChanger";

export function LandingHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			{/* Donation Banner */}
			<div className="bg-gray-900 dark:bg-neutral-900/70 text-white text-sm py-2 px-4 text-center">
				<div className="flex items-center justify-center gap-2">
					<Heart className="w-4 h-4 text-red-400" />
					<span>
						If this project has helped you, please consider
						supporting us as we&apos;re building the future of
						AI-powered resume creation.
					</span>
				</div>
			</div>

			{/* Main Header */}
			<header className="bg-white/80 dark:bg-neutral-900/70 backdrop-blur-sm border-b border-gray-200 dark:border-none dark:drop-shadow-2xl/10 dark:drop-shadow-neutral-700 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo */}
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
									<span className="text-white font-bold text-sm">
										AI
									</span>
								</div>
							</div>
							<div className="ml-3">
								<h1 className="text-xl font-bold text-gray-900 dark:text-gray-200">
									SkillFresher
								</h1>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									AI-Powered Resume Builder
								</p>
							</div>
						</div>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex space-x-8 ">
							<a
								href="#features"
								className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
							>
								Features
							</a>
							<a
								href="./templete"
								className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
							>
								Templates
							</a>
							<a
								href="./pricing"
								className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
							>
								Pricing
							</a>
							<a
								href="#about"
								className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
							>
								About
							</a>
						</nav>

						{/* Theme Toggle Button */}
						{/* <ModeToggle /> */}
						{/* Desktop Actions */}
						<div className="hidden md:flex items-center space-x-4">
							<Button variant="ghost" asChild>
								<a href="/auth/signin">Sign In</a>
							</Button>
							<Button asChild>
								<a href="/auth/signup">Get Started</a>
							</Button>
						</div>

						{/* Mobile menu button */}
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
					</div>
				</div>

				{/* Mobile Navigation */}
				{mobileMenuOpen && (
					<div className="md:hidden bg-white border-t border-gray-200">
						<div className="px-4 py-2 space-y-1">
							<a
								href="#features"
								className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
							>
								Features
							</a>
							<a
								href="#templates"
								className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
							>
								Templates
							</a>
							<a
								href="#pricing"
								className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
							>
								Pricing
							</a>
							<a
								href="#about"
								className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
							>
								About
							</a>
							<div className="pt-4 pb-2 border-t border-gray-200">
								<div className="space-y-2">
									<Button
										variant="ghost"
										className="w-full justify-start"
										asChild
									>
										<a href="/auth/signin">Sign In</a>
									</Button>
									<Button className="w-full" asChild>
										<a href="/auth/signup">Get Started</a>
									</Button>
								</div>
							</div>
						</div>
					</div>
				)}
			</header>
		</>
	);
}
