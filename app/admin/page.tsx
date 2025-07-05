import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { RoleAuthService } from "@/lib/auth/role-auth";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });
  
  // Get the current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/signin");
  }

  // Check if user is admin
  const isAdmin = await RoleAuthService.isAdmin(user.id);
  if (!isAdmin) {
    redirect("/dashboard?error=insufficient_permissions");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminDashboard />
    </div>
  );
} 