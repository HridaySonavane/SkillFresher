import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { RoleAuthService } from "@/lib/auth/role-auth";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<AdminDashboard />
		</div>
	);
}
