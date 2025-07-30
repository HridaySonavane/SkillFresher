import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingTemplate } from "@/components/landing/landing-template";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingTestimonial } from "@/components/landing/landing-testimonials";
import { LandingFaq } from "@/components/landing/landing-faq";
import { LandingShowcase } from "@/components/landing/landing-showcase";

export default function Home() {
	return (
		<div className="min-h-screen ">
			<LandingHeader />
			<LandingHero />
			<LandingShowcase />
			<LandingFeatures />
			<LandingTemplate />
			<LandingTestimonial />
			<LandingFaq />
			<LandingFooter />
		</div>
	);
}
