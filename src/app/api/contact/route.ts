import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString()?.trim();
    const business = formData.get("business")?.toString()?.trim();
    const email = formData.get("email")?.toString()?.trim();
    const phone = formData.get("phone")?.toString()?.trim() || null;
    const service = formData.get("service")?.toString()?.trim();
    const message = formData.get("message")?.toString()?.trim() || null;

    if (!name || !business || !email || !service) {
      return NextResponse.json(
        { error: "Name, business, email, and service are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("earning1_inquiries").insert({
      name,
      business_name: business,
      email,
      phone,
      service_type: service,
      message,
      source: "contact_form",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Could not save your inquiry. Please email us directly at hello@yuvrajojha.com.np" },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/contact?sent=true", request.url)
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email hello@yuvrajojha.com.np" },
      { status: 500 }
    );
  }
}
