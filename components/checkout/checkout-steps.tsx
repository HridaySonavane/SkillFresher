import { Check } from "lucide-react";

interface CheckoutStepsProps {
	currentStep: number;
}

const steps = [
	{ id: 1, name: "Plan Selection", description: "Choose your plan" },
	{ id: 2, name: "Account Info", description: "Create your account" },
	{ id: 3, name: "Payment", description: "Complete payment" },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
	return (
		<div className="flex items-center justify-center">
			<nav className="flex items-center space-x-8">
				{steps.map((step, index) => (
					<div key={step.id} className="flex items-center">
						<div className="flex items-center">
							<div
								className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
									step.id < currentStep
										? "bg-green-500 border-green-500 text-white"
										: step.id === currentStep
											? "bg-blue-600 border-blue-600 text-white"
											: "bg-white border-gray-300 text-gray-500"
								}`}
							>
								{step.id < currentStep ? (
									<Check className="w-4 h-4" />
								) : (
									<span className="text-sm font-medium">
										{step.id}
									</span>
								)}
							</div>
							<div className="ml-3">
								<p
									className={`text-sm font-medium ${step.id <= currentStep ? "text-gray-900" : "text-gray-500"}`}
								>
									{step.name}
								</p>
								<p className="text-xs text-gray-500">
									{step.description}
								</p>
							</div>
						</div>
						{index < steps.length - 1 && (
							<div className="ml-8 w-16 h-px bg-gray-300" />
						)}
					</div>
				))}
			</nav>
		</div>
	);
}
