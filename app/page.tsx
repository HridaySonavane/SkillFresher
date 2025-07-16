import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingTemplate } from "@/components/landing/landing-template";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingHeader } from "@/components/landing/landing-header";

export default function Home() {
	return (
		<div className="min-h-screen">
			<LandingHeader />
			<LandingHero />
			<LandingFeatures />
			<LandingTemplate />
			<LandingFooter />
		</div>
	);
}
