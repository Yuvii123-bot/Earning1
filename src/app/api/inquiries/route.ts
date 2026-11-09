import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      business_slug,
      customer_name,
      customer_phone,
      service_selected,
      preferred_date,
      estimated_value,
      notes,
      is_preview_test,
    } = body;

    if (!business_slug || !customer_name || !customer_phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("earning1_inquiries")
      .insert({
        business_slug,
        customer_name: String(customer_name).slice(0, 120),
        customer_phone: String(customer_phone).slice(0, 60),
        service_selected: service_selected ? String(service_selected).slice(0, 200) : null,
        preferred_date: preferred_date ? String(preferred_date).slice(0, 100) : null,
        estimated_value: estimated_value ? String(estimated_value).slice(0, 80) : null,
        notes: notes ? String(notes).slice(0, 500) : null,
        is_preview_test: Boolean(is_preview_test),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, inquiry: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save booking" },
      { status: 500 }
    );
  }
}
