"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  cohort?: string;
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
  const [cohortTab, setCohortTab] = useState<"kora" | "batch1" | "all">("kora");
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

  const filteredLeads = useMemo(() => {
    if (cohortTab === "all") return leads;
    return leads.filter((l) => (l.cohort || "batch1") === cohortTab);
  }, [leads, cohortTab]);

  function getBaseUrlForLead(lead: LeadRow) {
    if ((lead.cohort || "batch1") === "batch1") {
      return "https://nepal-web-studio.vercel.app";
    }
    return origin || "https://atelier-kora.vercel.app";
  }

  function copyLink(lead: LeadRow) {
    const url = `${getBaseUrlForLead(lead)}/${lead.slug}?preview=1`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(lead.slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  }

  const totalPipelineNpr = filteredLeads.reduce(
    (sum, l) => sum + (l.pitch_price_npr || 0),
    0
  );
  const totalMonthlyCareNpr = filteredLeads.reduce(
    (sum, l) => sum + (l.monthly_care_npr || 0),
    0
  );
  const emailedCount = filteredLeads.filter(
    (l) => l.outreach_status !== "ready"
  ).length;
  const totalOwnerViews = filteredLeads.reduce(
    (sum, l) => sum + (l.owner_view_count || 0),
    0
  );
  const soldRevenueNpr = filteredLeads
    .filter((l) => l.outreach_status === "sold")
    .reduce((sum, l) => sum + (l.pitch_price_npr || 0), 0);

  return (
    <div className="min-h-screen bg-[#090A0C] text-stone-100">
      <header className="border-b border-white/10 bg-black/70 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="rounded-full border border-[#C5A059]/40 bg-[#C5A059]/15 px-3 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#E2C282]">
                ATELIER KORA · LIVE CRM
              </span>
              <h1 className="font-display text-2xl font-semibold text-white">
                Partner Pipeline &amp; Owner-Open Telemetry
              </h1>
            </div>
            <p className="mt-1 text-xs text-stone-400">
              Track real-time `?preview=1` owner opens across Batch 2 (Atelier Kora) and Batch 1, send WhatsApp follow-ups, and bind custom client domains.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="rounded-xl border border-white/15 px-3.5 py-2 text-xs font-semibold text-stone-300 hover:bg-white/5"
            >
              View Atelier Kora `/`
            </Link>
            <button
              onClick={fetchDashboard}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#C5A059] px-4 py-2 text-xs font-bold text-stone-950 hover:bg-[#D5B26E]"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh Live Data
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Cohort Switcher */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1 text-xs font-semibold">
            {[
              { id: "kora", label: "Atelier Kora · Batch 2 (10 Luxury Targets)" },
              { id: "batch1", label: "Batch 1 · Nepal Web Studio (8 Targets)" },
              { id: "all", label: "Combined Portfolio (18)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCohortTab(tab.id as "kora" | "batch1" | "all")}
                className={`rounded-xl px-4 py-2 transition ${
                  cohortTab === tab.id
                    ? "bg-[#C5A059] text-stone-950 font-bold"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs text-stone-400">Active Pipeline Value</p>
            <p className="mt-1 font-display text-3xl font-semibold text-white">
              NPR {totalPipelineNpr.toLocaleString()}
            </p>
            <p className="mt-1 font-mono text-[11px] text-[#E2C282]">
              + NPR {totalMonthlyCareNpr.toLocaleString()}/mo recurring care
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs text-stone-400">Outreach Dispatched</p>
            <p className="mt-1 font-display text-3xl font-semibold text-sky-300">
              {emailedCount} / {filteredLeads.length}
            </p>
            <p className="mt-1 text-[11px] text-stone-400">
              Replies arrive directly at imyuvojha@gmail.com
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs text-stone-400">Owner Preview Opens</p>
            <p className="mt-1 font-display text-3xl font-semibold text-amber-300">
              {totalOwnerViews}
            </p>
            <p className="mt-1 text-[11px] text-stone-400">
              Auto-incremented when decision-makers open `?preview=1`
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
            <p className="text-xs text-emerald-300">Closed Revenue (Sold)</p>
            <p className="mt-1 font-display text-3xl font-semibold text-emerald-300">
              NPR {soldRevenueNpr.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] text-stone-300">
              2 luxury closes = ~NPR 48,000+ upfront + monthly care
            </p>
          </div>
        </div>

        {/* Leads Cards */}
        <div className="mt-8 space-y-4">
          <h2 className="font-display text-2xl font-semibold text-white">
            Prospect Accounts ({filteredLeads.length})
          </h2>

          {filteredLeads.map((lead) => {
            const base = getBaseUrlForLead(lead);
            const previewUrl = `${base}/${lead.slug}?preview=1`;
            const cleanUrl = `${base}/${lead.slug}`;
            const whatsappFollowUp = lead.whatsapp
              ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
                  `Greetings ${lead.business_name} team — following up on the private digital flagship preview we engineered for you at Atelier Kora: ${previewUrl}\n\nFeel free to test the interactive calculator & booking flow on your phone. Happy to connect it to your domain within 24 hours if you'd like to move forward.`
                )}`
              : null;

            return (
              <div
                key={lead.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div className="space-y-1.5 lg:max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#E2C282]">
                        {(lead.cohort || "batch1") === "kora"
                          ? "ATELIER KORA"
                          : "BATCH 1"}{" "}
                        · {lead.city}
                      </span>
                      <span className="text-xs text-stone-400">{lead.category}</span>
                      {lead.gmail_message_id && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                          <CheckCircle2 className="h-3 w-3" /> Email Sent
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-2xl font-semibold text-white">
                      {lead.business_name}
                    </h3>

                    <p className="text-xs text-stone-300">
                      <Mail className="mr-1 inline h-3.5 w-3.5 text-[#C5A059]" />
                      <span className="font-mono">{lead.email}</span> · 📞 {lead.phone}
                    </p>

                    <div className="mt-2 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-100">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <span>
                        <strong>Audited Live Website Flaw:</strong> {lead.audit_issue}
                      </span>
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex flex-col gap-3 lg:min-w-[350px]">
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300">
                          <Eye className="h-3.5 w-3.5" />
                          Owner Opens: {lead.owner_view_count}
                        </span>
                        <span className="text-stone-400">
                          Total Views: {lead.view_count}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-[#E2C282]">
                        NPR {lead.pitch_price_npr.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-[#E2C282]" />
                        Owner Preview
                        <ExternalLink className="h-3 w-3" />
                      </a>

                      <a
                        href={cleanUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-stone-300 hover:bg-white/5"
                      >
                        Clean URL
                        <ExternalLink className="h-3 w-3" />
                      </a>

                      <button
                        onClick={() => copyLink(lead)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-stone-300 hover:bg-white/5"
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
                          WhatsApp
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
                        className="rounded-xl border border-white/15 bg-black px-3 py-2 text-xs font-semibold text-stone-200"
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
                          className="w-full rounded-xl border border-white/15 bg-black px-2.5 py-2 text-xs text-white placeholder-stone-500"
                        />
                        <button
                          onClick={() =>
                            updateLead(lead.slug, {
                              custom_domain: domainInputs[lead.slug] || "",
                            })
                          }
                          disabled={savingSlug === lead.slug}
                          title="Bind Custom Domain"
                          className="rounded-xl bg-[#C5A059] px-3 py-2 text-xs font-bold text-stone-950 hover:bg-[#D5B26E]"
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

        {/* Live Inquiries */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#E2C282]" />
            <h2 className="font-display text-2xl font-semibold text-white">
              Live Calculator &amp; Booking Submissions ({inquiries.length})
            </h2>
          </div>
          {inquiries.length === 0 ? (
            <p className="mt-3 text-xs text-stone-400">
              Every room reservation, BOQ request, dermatology booking, expedition inquiry, or tea export RFQ tested by a prospect appears here in real time.
            </p>
          ) : (
            <div className="mt-4 divide-y divide-white/10 text-xs">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="flex flex-wrap items-center justify-between gap-2 py-3"
                >
                  <div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-[#E2C282]">
                      {inq.business_slug}
                    </span>
                    <span className="ml-2 font-bold text-white">
                      {inq.customer_name}
                    </span>{" "}
                    <span className="text-stone-400">({inq.customer_phone})</span>
                    {inq.service_selected && (
                      <span className="ml-2 text-stone-300">
                        — {inq.service_selected}
                      </span>
                    )}
                  </div>
                  <div className="text-stone-400">
                    {new Date(inq.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
