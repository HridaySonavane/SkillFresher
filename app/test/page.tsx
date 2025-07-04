import { EmailTest } from "@/components/email-test"

export default function TestEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Configuration Test</h1>
          <p className="text-gray-600">Test your Supabase email authentication setup</p>
        </div>
        <EmailTest />
      </div>
    </div>
  )
}
