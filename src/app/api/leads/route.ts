import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const [{ data: businesses, error: bErr }, { data: inquiries }] =
      await Promise.all([
        supabase
          .from("earning1_businesses")
          .select("*")
          .order("city", { ascending: true })
          .order("business_name", { ascending: true }),
        supabase
          .from("earning1_inquiries")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50),
      ]);

    if (bErr) {
      return NextResponse.json({ error: bErr.message }, { status: 500 });
    }

    return NextResponse.json({
      businesses: businesses || [],
      inquiries: inquiries || [],
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load leads" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, outreach_status, custom_domain, pitch_price_npr } = body;
    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (outreach_status !== undefined) updates.outreach_status = outreach_status;
    if (custom_domain !== undefined) {
      const cleaned = String(custom_domain)
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/\/.*$/, "");
      updates.custom_domain = cleaned || null;
    }
    if (pitch_price_npr !== undefined) {
      updates.pitch_price_npr = Number(pitch_price_npr);
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("earning1_businesses")
      .update(updates)
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, business: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Update failed" },
      { status: 500 }
    );
  }
}
