// Optional: Direct Resend integration for custom emails
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const emailService = {
  async sendWelcomeEmail(to: string, name: string) {
    return await resend.emails.send({
      from: "ResumeAI <onboarding@resend.dev>",
      to: [to],
      subject: "Welcome to ResumeAI!",
      html: `
        <h1>Welcome ${name}!</h1>
        <p>Thanks for joining ResumeAI. Start building your professional resume today.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Get Started</a>
      `,
    })
  },

  async sendResumeReady(to: string, resumeTitle: string) {
    return await resend.emails.send({
      from: "ResumeAI <onboarding@resend.dev>",
      to: [to],
      subject: "Your resume is ready for download!",
      html: `
        <h1>Your resume "${resumeTitle}" is ready!</h1>
        <p>Your AI-optimized resume has been generated and is ready for download.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Download Now</a>
      `,
    })
  },
}
