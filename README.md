# Atelier Kora (Batch 2) + Nepal Web Studio (Batch 1) — Multi-Tenant Build-First Engine

## Live Production Deployments

- **Atelier Kora — Batch 2 Luxury Flagship Studio:** **`https://atelier-kora-xi.vercel.app`**
- **Unified Partner CRM & Real-Time Open Telemetry:** **`https://atelier-kora-xi.vercel.app/dashboard`**
- **Batch 1 Legacy Deployment (Untouched & Live):** **`https://nepal-web-studio.vercel.app`**

---

## Batch 2 — Atelier Kora (10 High-Ticket, Email-Active Luxury Prospects · NPR 244,990 Pipeline)

| # | Business & Decision-Maker | City / Area | Prospect Email | Pitch (NPR) | Live Preview URL (Sent) | Clean Client URL |
|---|---|---|---|---|---|---|
| 1 | **Pokhara Boutique Hotel** | Khahare Lakeside, Pokhara | `pokharaboutiquehotel@gmail.com` | NPR 24,999 | [`/pokhara-boutique-hotel?preview=1`](https://atelier-kora-xi.vercel.app/pokhara-boutique-hotel?preview=1) | [`/pokhara-boutique-hotel`](https://atelier-kora-xi.vercel.app/pokhara-boutique-hotel) |
| 2 | **Boutique Heritage Home** *(Naveen Pradhan)* | Saugal Tole, Patan | `heritagehomenepal@gmail.com` | NPR 22,999 | [`/boutique-heritage-patan?preview=1`](https://atelier-kora-xi.vercel.app/boutique-heritage-patan?preview=1) | [`/boutique-heritage-patan`](https://atelier-kora-xi.vercel.app/boutique-heritage-patan) |
| 3 | **Hotel Yechu** | Nagarkot Rd, Bhaktapur | `info@hotelyechu.com.np` | NPR 24,999 | [`/hotel-yechu-bhaktapur?preview=1`](https://atelier-kora-xi.vercel.app/hotel-yechu-bhaktapur?preview=1) | [`/hotel-yechu-bhaktapur`](https://atelier-kora-xi.vercel.app/hotel-yechu-bhaktapur) |
| 4 | **Griha Prabesh Design Studio** *(Ar. Manjil Bista)* | Gwarko, Lalitpur | `grihaprabesh.designs@gmail.com` | NPR 21,999 | [`/griha-prabesh-architects?preview=1`](https://atelier-kora-xi.vercel.app/griha-prabesh-architects?preview=1) | [`/griha-prabesh-architects`](https://atelier-kora-xi.vercel.app/griha-prabesh-architects) |
| 5 | **Nepal Interiors Pvt. Ltd** | Pepsicola, Kathmandu | `nepalinteriors8848@gmail.com` | NPR 21,999 | [`/nepal-interiors-studio?preview=1`](https://atelier-kora-xi.vercel.app/nepal-interiors-studio?preview=1) | [`/nepal-interiors-studio`](https://atelier-kora-xi.vercel.app/nepal-interiors-studio) |
| 6 | **Sharvaaya Skin & Hair Clinic** *(Dr. Saujan Subedi)* | Lazimpat, Kathmandu | `sharvaayaskinhair@gmail.com` | NPR 21,999 | [`/sharvaaya-clinic?preview=1`](https://atelier-kora-xi.vercel.app/sharvaaya-clinic?preview=1) | [`/sharvaaya-clinic`](https://atelier-kora-xi.vercel.app/sharvaaya-clinic) |
| 7 | **Aesthetic Aura Skin & Hair Clinic** *(Dr. Isha Poudel Koirala)* | Sankhamul, Baneshwor | `aestheticauranepal@gmail.com` | NPR 22,999 | [`/aesthetic-aura-clinic?preview=1`](https://atelier-kora-xi.vercel.app/aesthetic-aura-clinic?preview=1) | [`/aesthetic-aura-clinic`](https://atelier-kora-xi.vercel.app/aesthetic-aura-clinic) |
| 8 | **Nepal Trekking & Expedition Pvt. Ltd.** *(Est. 1993)* | Kwabahal, Thamel | `nepaltrekking@gmail.com` | NPR 26,999 | [`/nepal-trek-expeditions?preview=1`](https://atelier-kora-xi.vercel.app/nepal-trek-expeditions?preview=1) | [`/nepal-trek-expeditions`](https://atelier-kora-xi.vercel.app/nepal-trek-expeditions) |
| 9 | **Well Nepal Treks & Tours Pvt. Ltd.** *(CEO Mr. Ramesh)* | Bhagwan Bahal, Thamel | `wellnepaltreks@gmail.com` | NPR 26,999 | [`/well-nepal-treks?preview=1`](https://atelier-kora-xi.vercel.app/well-nepal-treks?preview=1) | [`/well-nepal-treks`](https://atelier-kora-xi.vercel.app/well-nepal-treks) |
| 10 | **All Nepalese Tea & Coffee Center · Tealaya** *(MD Santosh Chandra Kunwar)* | Kupondole / Thamel / Jhamsikhel | `allnepaltea@gmail.com` | NPR 27,999 | [`/tealaya-nepal-export?preview=1`](https://atelier-kora-xi.vercel.app/tealaya-nepal-export?preview=1) | [`/tealaya-nepal-export`](https://atelier-kora-xi.vercel.app/tealaya-nepal-export) |

---

## Batch 1 — Nepal Web Studio (8 Prospects · NPR 99,992 Pipeline — Live & Untouched)

All 8 Batch-1 preview & clean URLs remain live on `https://nepal-web-studio.vercel.app/<slug>` (`evoke-jhamsikhel`, `apple-dental`, `smile-signature`, `advance-paragliding`, `green-spa-pokhara`, `le-spa-pokhara`, `rosemary-spa`, `meditouch-pokhara`).

---

## 60-Second Custom-Domain Handover Playbook

1. **Add Client Domain in Vercel:** In Vercel → Project **`atelier-kora`** (`prj_hxrkEn6Yu6q0LFZUQ1Ww9PQgtZaP`) → Settings → Domains, add their domain (e.g., `pokharaboutique.com`, `bhhnepal.com`, `grihaprabesh.com.np`, or `tealaya.com.np`).
2. **Point DNS:** Root `@` `A` record → `76.76.21.21` and `www` `CNAME` → `cname.vercel-dns.com` (Vercel auto-issues HTTPS/SSL).
3. **Bind in Dashboard:** Open `https://atelier-kora-xi.vercel.app/dashboard`, paste their domain into the **Attach domain** input for that business, and click the gold Globe icon. `src/app/page.tsx` automatically serves **only** their white-label luxury site at `/` with zero preview bar!
4. **Collect Payment:** Settle the **NPR 21,999 – 27,999** turnkey fee via Corporate Bank Transfer, Fonepay, eSewa, or Khalti + offer the optional **NPR 2,000 – 2,500/month** Managed Cloud & Concierge Care plan.
