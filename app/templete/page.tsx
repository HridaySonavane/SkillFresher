import { TemplateGallery } from "@/components/templates/template-gallery";
import { TemplateHeader } from "@/components/templates/template-header";
import { TemplateFilters } from "@/components/templates/template-filters";
import { TemplateCategories } from "@/components/templates/template-categories";

export default function TemplatesPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
			<TemplateHeader />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<TemplateCategories />
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
					<div className="lg:col-span-1">
						<TemplateFilters />
					</div>
					<div className="lg:col-span-3">
						<TemplateGallery />
					</div>
				</div>
			</div>
		</div>
	);
}
