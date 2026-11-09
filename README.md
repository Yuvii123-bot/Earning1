# Yuvraj Digital Studio — Build-First Micro-Site Engine (Kathmandu & Pokhara, Nepal)

Live Production URL: **`https://nepal-web-studio.vercel.app`**  
Founder CRM & Open-Tracking Console: **`https://nepal-web-studio.vercel.app/dashboard`**

A multi-tenant Next.js 16 + Supabase production platform powering **8 bespoke, mobile-first websites** built for verified businesses in **Kathmandu** and **Pokhara**, complete with real-time owner preview-open tracking, WhatsApp booking calculators, and zero-code custom-domain handover.

---

## 1. Live Client Builds & Outreach Pipeline

| # | Business | City / Area | Prospect Email | Turnkey Pitch | Live Preview URL (Sent in Email) | Clean White-Label URL |
|---|---|---|---|---|---|---|
| 1 | **EVOKE Cafe & Bistro** | Jhamsikhel, Kathmandu | `evoke.cafebistro@gmail.com` | NPR 14,999 | [`/evoke-jhamsikhel?preview=1`](https://nepal-web-studio.vercel.app/evoke-jhamsikhel?preview=1) | [`/evoke-jhamsikhel`](https://nepal-web-studio.vercel.app/evoke-jhamsikhel) |
| 2 | **Apple Dental Clinic** | Panipokhari, Lazimpat | `appledentalnepal@gmail.com` | NPR 11,999 | [`/apple-dental?preview=1`](https://nepal-web-studio.vercel.app/apple-dental?preview=1) | [`/apple-dental`](https://nepal-web-studio.vercel.app/apple-dental) |
| 3 | **Smile Signature Nepal** | Blue Note Bldg, Lazimpat | `drbhusal80@gmail.com` | NPR 12,999 | [`/smile-signature?preview=1`](https://nepal-web-studio.vercel.app/smile-signature?preview=1) | [`/smile-signature`](https://nepal-web-studio.vercel.app/smile-signature) |
| 4 | **Advance Paragliding Pvt. Ltd** | Lakeside St. 7, Pokhara | `advance.parabooking@gmail.com` | NPR 14,999 | [`/advance-paragliding?preview=1`](https://nepal-web-studio.vercel.app/advance-paragliding?preview=1) | [`/advance-paragliding`](https://nepal-web-studio.vercel.app/advance-paragliding) |
| 5 | **Green Spa Pokhara Lakeside** | Lakeside St. 14, Pokhara | `greenspa94@gmail.com` | NPR 9,999 | [`/green-spa-pokhara?preview=1`](https://nepal-web-studio.vercel.app/green-spa-pokhara?preview=1) | [`/green-spa-pokhara`](https://nepal-web-studio.vercel.app/green-spa-pokhara) |
| 6 | **Le Spa by Donaldji** | Hallanchowk, Pokhara | `info.lespabydonaldji@gmail.com` | NPR 12,999 | [`/le-spa-pokhara?preview=1`](https://nepal-web-studio.vercel.app/le-spa-pokhara?preview=1) | [`/le-spa-pokhara`](https://nepal-web-studio.vercel.app/le-spa-pokhara) |
| 7 | **Rosemary Spa & Beauty Home** | Lakeside St. 16, Pokhara | `rosemaryspa.pkr@gmail.com` | NPR 10,999 | [`/rosemary-spa?preview=1`](https://nepal-web-studio.vercel.app/rosemary-spa?preview=1) | [`/rosemary-spa`](https://nepal-web-studio.vercel.app/rosemary-spa) |
| 8 | **MediTouch Skin & Hair Clinic** | Pokhara | `clinic.meditouch@gmail.com` | NPR 11,999 | [`/meditouch-pokhara?preview=1`](https://nepal-web-studio.vercel.app/meditouch-pokhara?preview=1) | [`/meditouch-pokhara`](https://nepal-web-studio.vercel.app/meditouch-pokhara) |

---

## 2. 60-Second Closing & Custom Domain Launch Playbook

When any business owner replies by Gmail or WhatsApp (`+977 9847509025`):

1. **Customize any requested details (optional, 2 mins):**
   - Edit that business's entry in `src/data/businesses.ts` (phone, menu/treatment prices, doctor bio, or hero image in `public/images/`).
2. **Attach their official domain in Vercel (30 secs):**
   - Open Vercel Project **`nepal-web-studio` → Settings → Domains** and add their domain (e.g., `evokenepal.com` or `appledentalnepal.com.np`).
   - Point their domain DNS:
     - Root `@` `A` record → `76.76.21.21`
     - `www` `CNAME` record → `cname.vercel-dns.com`
     - *(For free `.com.np` domains via `register.com.np`, point nameservers to Cloudflare free DNS first, then set the `A` and `CNAME` records above—Vercel provisions HTTPS/SSL automatically.)*
3. **Bind the domain in your Founder Console (15 secs):**
   - Open `https://nepal-web-studio.vercel.app/dashboard`
   - Paste their domain (e.g., `appledentalnepal.com.np`) into that business's **Custom Domain** field and click **Bind**, then set status to **`won`**.
   - `src/app/page.tsx` reads the incoming `Host` header and **automatically serves ONLY that client's white-label website at `/`** (with zero preview banner and zero studio branding!).
4. **Collect Payment:**
   - Send them their live HTTPS link on their own domain and collect the **NPR 9,999 – 14,999** setup fee via **eSewa / Khalti / Fonepay / Bank Transfer**, plus offer the optional **NPR 1,500/month** care & hosting plan.
