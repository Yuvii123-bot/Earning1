"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  ExternalLink,
  RefreshCw,
  Mail,
  Eye,
  CheckCircle2,
  Globe,
  MessageCircle,
  Copy,
  Sparkles,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { BUSINESSES } from "@/data/businesses";

interface LeadRow {
  slug: string;
  business_name: string;
  city: string;
  neighborhood: string;
  category: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  current_website: string | null;
  audit_issue: string;
  pitch_price_npr: number;
  monthly_care_npr: number;
  custom_domain: string | null;
  outreach_status: string;
  gmail_message_id: string | null;
  gmail_thread_id: string | null;
  emailed_at: string | null;
  view_count: number;
  owner_view_count: number;
  last_viewed_at: string | null;
}

interface InquiryRow {
  id: string;
  business_slug: string;
  customer_name: string;
  customer_phone: string;
  service_selected: string | null;
  preferred_date: string | null;
  estimated_value: string | null;
  is_preview_test: boolean;
  created_at: string;
}

export default function FounderDashboardPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [domainInputs, setDomainInputs] = useState<Record<string, string>>({});
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string>("");

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      const data = await res.json();
      if (data.businesses) {
        setLeads(data.businesses);
        const map: Record<string, string> = {};
        for (const row of data.businesses as LeadRow[]) {
          map[row.slug] = row.custom_domain || "";
        }
        setDomainInputs(map);
      }
      if (data.inquiries) {
        setInquiries(data.inquiries);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
    fetchDashboard();
  }, [fetchDashboard]);

  async function updateLead(slug: string, payload: Record<string, unknown>) {
    setSavingSlug(slug);
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ...payload }),
      });
      await fetchDashboard();
    } finally {
      setSavingSlug(null);
    }
  }

  function copyLink(slug: string) {
    const url = `${origin}/${slug}?preview=1`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  }

  const totalPipelineNpr = leads.reduce((sum, l) => sum + (l.pitch_price_npr || 0), 0);
  const totalMonthlyCareNpr = leads.reduce((sum, l) => sum + (l.monthly_care_npr || 0), 0);
  const emailedCount = leads.filter((l) => l.outreach_status !== "ready").length;
  const totalOwnerViews = leads.reduce((sum, l) => sum + (l.owner_view_count || 0), 0);
  const soldRevenueNpr = leads
    .filter((l) => l.outreach_status === "sold")
    .reduce((sum, l) => sum + (l.pitch_price_npr || 0), 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/60 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                LIVE SUPABASE CRM
              </span>
              <h1 className="text-xl font-extrabold text-white">
                Build-First Dropshipping Command Center (Kathmandu &amp; Pokhara)
              </h1>
            </div>
            <p className="mt-1 text-xs text-zinc-400">
              Monitor owner preview opens, manage email/WhatsApp outreach, and connect custom client domains in 60 seconds.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="rounded-xl border border-zinc-700 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
            >
              View Public Studio `/`
            </Link>
            <button
              onClick={fetchDashboard}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh Live Data
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-xs text-zinc-400">8-Site Pipeline Value</p>
            <p className="mt-1 text-2xl font-extrabold text-white">
              NPR {totalPipelineNpr.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] text-emerald-400">
              + NPR {totalMonthlyCareNpr.toLocaleString()}/mo recurring care potential
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-xs text-zinc-400">Outreach Emails Sent</p>
            <p className="mt-1 text-2xl font-extrabold text-sky-400">
              {emailedCount} / {leads.length || BUSINESSES.length}
            </p>
            <p className="mt-1 text-[11px] text-zinc-400">
              Replies land directly in imyuvojha@gmail.com
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-xs text-zinc-400">Owner Preview Link Opens</p>
            <p className="mt-1 text-2xl font-extrabold text-amber-400">
              {totalOwnerViews}
            </p>
            <p className="mt-1 text-[11px] text-zinc-400">
              Auto-tracked whenever an owner clicks `?preview=1`
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
            <p className="text-xs text-emerald-300">Closed Revenue (Sold)</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-400">
              NPR {soldRevenueNpr.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] text-zinc-300">
              2 closes = ~NPR 24,000+ cash + monthly retainer
            </p>
          </div>
        </div>

        {/* Leads Table / Cards */}
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-white">
            Active Kathmandu &amp; Pokhara Prospects ({leads.length})
          </h2>

          {leads.map((lead) => {
            const previewPath = `/${lead.slug}?preview=1`;
            const cleanPath = `/${lead.slug}`;
            const whatsappFollowUp = lead.whatsapp
              ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
                  `Namaste ${lead.business_name} team! 🙏 Just following up on the email I sent — I noticed an issue with your current web presence (${lead.current_website || "no website"}), so I built a fast mobile booking preview specifically for ${lead.business_name}: ${origin}/${lead.slug}?preview=1\n\nTake a quick 30-second look on your phone! If you like it, I can connect it to your own domain within 24 hours. — Yuvraj`
                )}`
              : null;

            return (
              <div
                key={lead.slug}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-zinc-700"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div className="space-y-1.5 lg:max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-zinc-800 px-2.5 py-0.5 text-[11px] font-bold text-zinc-200">
                        {lead.city} · {lead.neighborhood}
                      </span>
                      <span className="text-xs text-zinc-400">{lead.category}</span>
                      {lead.gmail_message_id && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" /> Email Sent
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {lead.business_name}
                    </h3>

                    <p className="text-xs text-zinc-300">
                      <Mail className="mr-1 inline h-3.5 w-3.5 text-sky-400" />
                      <span className="font-mono">{lead.email}</span> · 📞 {lead.phone}
                    </p>

                    <div className="mt-2 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-200">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <span>
                        <strong>Verified Pitch Hook:</strong> {lead.audit_issue}
                      </span>
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex flex-col gap-3 lg:min-w-[340px]">
                    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300">
                          <Eye className="h-3.5 w-3.5" />
                          Owner Opens: {lead.owner_view_count}
                        </span>
                        <span className="text-zinc-400">
                          Total Views: {lead.view_count}
                        </span>
                      </div>
                      <span className="font-bold text-emerald-400">
                        NPR {lead.pitch_price_npr.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={previewPath}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-700"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                        Owner Preview
                        <ExternalLink className="h-3 w-3" />
                      </Link>

                      <Link
                        href={cleanPath}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
                      >
                        Clean Client URL
                        <ExternalLink className="h-3 w-3" />
                      </Link>

                      <button
                        onClick={() => copyLink(lead.slug)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {copiedSlug === lead.slug ? "Copied!" : "Copy Link"}
                      </button>

                      {whatsappFollowUp && (
                        <a
                          href={whatsappFollowUp}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          WhatsApp Follow-Up
                        </a>
                      )}
                    </div>

                    {/* Status + Custom Domain Binder */}
                    <div className="grid gap-2 sm:grid-cols-2">
                      <select
                        value={lead.outreach_status}
                        onChange={(e) =>
                          updateLead(lead.slug, { outreach_status: e.target.value })
                        }
                        className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-200"
                      >
                        <option value="ready">Status: Ready</option>
                        <option value="emailed">Status: Emailed ✉️</option>
                        <option value="opened">Status: Owner Opened 👀</option>
                        <option value="replied">Status: Replied 🔥</option>
                        <option value="sold">Status: SOLD 💰</option>
                      </select>

                      <div className="flex gap-1.5">
                        <input
                          value={domainInputs[lead.slug] ?? ""}
                          onChange={(e) =>
                            setDomainInputs((prev) => ({
                              ...prev,
                              [lead.slug]: e.target.value,
                            }))
                          }
                          placeholder="Attach domain (e.g. brand.com)"
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-2.5 py-2 text-xs text-white placeholder-zinc-500"
                        />
                        <button
                          onClick={() =>
                            updateLead(lead.slug, {
                              custom_domain: domainInputs[lead.slug] || "",
                            })
                          }
                          disabled={savingSlug === lead.slug}
                          title="Bind Custom Domain"
                          className="rounded-xl bg-emerald-500 px-3 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400"
                        >
                          <Globe className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Demo Inquiries */}
        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              Live Booking Submissions Across Client Sites ({inquiries.length})
            </h2>
          </div>
          {inquiries.length === 0 ? (
            <p className="mt-3 text-xs text-zinc-400">
              Whenever a business owner tests their booking form—or once a client goes live—every booking appears here in real time.
            </p>
          ) : (
            <div className="mt-4 divide-y divide-zinc-800 text-xs">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="flex flex-wrap items-center justify-between gap-2 py-3"
                >
                  <div>
                    <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
                      {inq.business_slug}
                    </span>
                    <span className="ml-2 font-bold text-white">
                      {inq.customer_name}
                    </span>{" "}
                    <span className="text-zinc-400">({inq.customer_phone})</span>
                    {inq.service_selected && (
                      <span className="ml-2 text-zinc-300">
                        — {inq.service_selected}
                      </span>
                    )}
                  </div>
                  <div className="text-zinc-400">
                    {inq.estimated_value && (
                      <span className="mr-3 font-semibold text-amber-300">
                        {inq.estimated_value}
                      </span>
                    )}
                    {new Date(inq.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 60-Second Closing Playbook */}
        <div className="mt-8 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-6">
          <h3 className="text-base font-bold text-emerald-300">
            🚀 What To Do The Moment a Business Replies &ldquo;Yes, Interested!&rdquo;
          </h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-relaxed text-zinc-300">
            <li>
              <strong>Confirm any quick text/photo tweaks:</strong> Ask them on WhatsApp or email if they want any phone number, price, or photo adjusted (takes 2 minutes).
            </li>
            <li>
              <strong>Connect their domain (or your free GitHub Student Pack `.tech`/`.me` domain):</strong> In Vercel → Project Settings → Domains, add their domain (e.g. <code>evokenepal.com</code> or <code>greenspapokhara.com</code>), then paste that same domain into the <strong>Attach domain</strong> box above and click the green Globe button. This app automatically serves ONLY their site at <code>/</code> with zero preview banner!
            </li>
            <li>
              <strong>Collect payment in Nepal:</strong> Send your eSewa / Khalti / Fonepay QR or Bank details for the agreed setup fee (NPR 9,999 – 14,999) + offer the optional NPR 1,500/mo care plan!
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}
