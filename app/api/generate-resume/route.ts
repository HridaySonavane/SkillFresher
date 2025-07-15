import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import puppeteer from "puppeteer";
import { cookies as nextCookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({cookies: ()=> nextCookies()});
    // 1. Get Supabase session for the current user
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get the URL to render
    const url = request.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    // 3. Parse cookies from the request and set them in Puppeteer
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = cookieHeader
      .split(";")
      .map(cookieStr => {
        const [name, ...rest] = cookieStr.trim().split("=");
        return {
          name,
          value: rest.join("="),
          domain: "localhost", // Change to your domain in production
          path: "/"
        };
      })
      .filter(cookie => cookie.name && cookie.value);

    // 4. Launch Puppeteer and set cookies
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    if (cookies.length > 0) {
      await browser.setCookie(...cookies);
    }

    // 5. Go to the preview page as the authenticated user
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    // 6. Generate the PDF
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    // 7. Return the PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}