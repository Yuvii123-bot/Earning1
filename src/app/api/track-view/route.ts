import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { business_slug, source } = body;
    if (!business_slug) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const ua = req.headers.get("user-agent") || "unknown";
    const supabase = getSupabaseAdmin();

    await supabase.from("earning1_page_views").insert({
      business_slug,
      source: source || "direct",
      user_agent: ua.slice(0, 250),
    });

    const { data: current } = await supabase
      .from("earning1_businesses")
      .select("view_count, owner_view_count, outreach_status")
      .eq("slug", business_slug)
      .single();

    if (current) {
      const isOwnerPreview = source === "email_preview";
      const nextStatus =
        isOwnerPreview && current.outreach_status === "emailed"
          ? "opened"
          : current.outreach_status;

      await supabase
        .from("earning1_businesses")
        .update({
          view_count: (current.view_count || 0) + 1,
          owner_view_count:
            (current.owner_view_count || 0) + (isOwnerPreview ? 1 : 0),
          last_viewed_at: new Date().toISOString(),
          outreach_status: nextStatus,
        })
        .eq("slug", business_slug);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
