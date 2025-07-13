"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ResumeHeader } from "@/components/create-resume/resume-header";
import { TemplateSelection } from "@/components/create-resume/template-selection";
import { ResumeForm } from "@/components/create-resume/resume-form";
import { ResumePreview } from "@/components/create-resume/resume-preview";
import { CreateResumeSidebar } from "@/components/create-resume/create-resume-sidebar";
import type { ResumeData } from "@/lib/document-generators/types";
import { useTemplateData } from "@/hooks/use-template-data";

export default function CreateResumePage() {
	const params = useParams();
	const userId = params.userId as string;

	const [selectedTemplate, setSelectedTemplate] = useState(
		"modern-professional"
	);
	const [resumeData, setResumeData] = useState<ResumeData>({
		personalInfo: {
			name: "",
			email: "",
			phone: "",
			location: "",
			linkedin: "",
			website: "",
		},
		summary: "",
		experience: [],
		education: [],
		skills: [],
		projects: [],
	});
	const [currentStep, setCurrentStep] = useState<
		"template" | "form" | "preview"
	>("template");

	const handleTemplateSelect = (templateId: string) => {
		setSelectedTemplate(templateId);
		setCurrentStep("form");
	};

	const handleFormComplete = () => {
		setCurrentStep("preview");
	};

	const handleBackToForm = () => {
		setCurrentStep("form");
	};

	const handleBackToTemplates = () => {
		setCurrentStep("template");
	};

	const getProgress = () => {
		switch (currentStep) {
			case "template":
				return 33;
			case "form":
				return 66;
			case "preview":
				return 100;
			default:
				return 0;
		}
	};

	const getTemplateName = () => {
		const templates = {
			"modern-professional": "Modern Professional",
			"creative-designer": "Creative Designer",
			"tech-minimalist": "Tech Minimalist",
			"executive-classic": "Executive Classic",
			"academic-researcher": "Academic & Research",
			"startup-founder": "Startup Founder",
		};
		return (
			templates[selectedTemplate as keyof typeof templates] ||
			"Modern Professional"
		);
	};

	const { template, loading } = useTemplateData(selectedTemplate);

	return (
		<div
			className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${!resumeData && "w-full"}`}
		>
			<ResumeHeader
				currentStep={currentStep}
				onBackToTemplates={handleBackToTemplates}
				onBackToForm={handleBackToForm}
				userId={userId}
				progress={getProgress()}
				templateName={
					currentStep !== "template" ? getTemplateName() : undefined
				}
			/>

			<div className="flex h-full ">
				{/* Left Sidebar */}
				<CreateResumeSidebar
					currentStep={currentStep}
					selectedTemplate={selectedTemplate}
					userId={userId}
					template={template}
					loading={loading}
				/>

				{/* Main Content */}
				<div className="flex-1 flex">
					{/* Form/Content Area */}
					<div
						className={
							currentStep === "template"
								? "w-full"
								: "w-1/2 border-r border-gray-200"
						}
					>
						{currentStep === "template" && (
							<TemplateSelection
								onTemplateSelect={handleTemplateSelect}
								userId={userId}
							/>
						)}

						{currentStep === "form" && (
							<ResumeForm
								data={resumeData}
								onDataChange={setResumeData}
								templateId={selectedTemplate}
								onComplete={handleFormComplete}
								userId={userId}
							/>
						)}

						{currentStep === "preview" && (
							<div className="h-full flex items-center justify-center">
								<div className="text-center">
									<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
										Resume Created Successfully!
									</h2>
									<p className="text-gray-600 dark:text-gray-400 mb-6">
										Your resume is ready for download and
										sharing.
									</p>
									<div className="space-x-4">
										<button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
											Download PDF
										</button>
										<button
											onClick={handleBackToForm}
											className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
										>
											Edit Resume
										</button>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Preview Area */}
					{currentStep !== "template" && (
						<div className="flex-1 w-fit bg-white">
							{loading ? (
								<div>Loading template...</div>
							) : template ? (
								<ResumePreview
									templateId={template.id}
									data={resumeData}
									currentStep={currentStep}
								/>
							) : (
								<div>No template found</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
