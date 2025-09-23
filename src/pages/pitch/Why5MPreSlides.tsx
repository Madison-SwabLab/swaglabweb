import React from 'react';

export default function Why5MPreSlides() {
  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-100 font-sans">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Slide 1 - Title */}
        <section className="rounded-2xl bg-gradient-to-r from-slate-800/60 to-slate-900/60 p-8 shadow-2xl">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold">Why $5M Pre</h1>
              <p className="mt-2 text-slate-300 max-w-prose">Clear, capital-efficient plan to convert PoC → paying pilots while preserving meaningful founder upside. Target runway: 18–24 months.</p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                <li className="rounded-lg border border-white/6 bg-slate-800/40 p-4">
                  <strong className="block text-lg">Team</strong>
                  <span className="block mt-1 text-slate-300 text-sm">Repeat founders: SaaS exit ($10M) + profitable apparel ops — execution & distribution credibility.</span>
                </li>
                <li className="rounded-lg border border-white/6 bg-slate-800/40 p-4">
                  <strong className="block text-lg">Proof</strong>
                  <span className="block mt-1 text-slate-300 text-sm">Working PoC + multiple interested merch buyers (pilot conversations underway).</span>
                </li>
                <li className="rounded-lg border border-white/6 bg-slate-800/40 p-4">
                  <strong className="block text-lg">Moat</strong>
                  <span className="block mt-1 text-slate-300 text-sm">Proprietary apparel dataset + fine-tuned model optimized for production-ready outputs.</span>
                </li>
                <li className="rounded-lg border border-white/6 bg-slate-800/40 p-4">
                  <strong className="block text-lg">Market</strong>
                  <span className="block mt-1 text-slate-300 text-sm">B2B branded merchandise & promotional products — repeat buyers, high LTV when proven.</span>
                </li>
              </ul>
            </div>

            <div className="w-80 shrink-0">
              <div className="rounded-xl border border-white/8 bg-slate-800/30 p-4">
                <div className="text-xs text-slate-400">Example round</div>
                <div className="mt-2 text-2xl font-semibold">$500k @ $5M pre</div>
                <div className="mt-1 text-sm text-slate-300">Post: $5.5M — investor ownership ≈ 9%</div>

                <div className="mt-4 text-xs text-slate-400">Target outcomes (18–24 months)</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-300">
                  <li>• Production‑ready product</li>
                  <li>• 3–5 paid pilot customers</li>
                  <li>• $200–500k ARR</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2 - Use of Funds (Pie + Legend) */}
        <section className="rounded-2xl bg-gradient-to-r from-slate-800/40 to-slate-900/40 p-8 border border-white/6">
          <h2 className="text-2xl font-bold">Use of Funds — $500k over 18–24 months</h2>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
            <div className="md:w-1/2">
              <svg viewBox="0 0 200 200" className="w-full max-w-xs">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#2a98ff" />
                    <stop offset="100%" stopColor="#0f7ef2" />
                  </linearGradient>
                </defs>
                <g transform="translate(100,100)">
                  {/* Simple donut chart slices (40/30/20/10) */}
                  <path d="M0,-80 A80,80 0 0,1 56.57,-56.57 L28.28,-28.28 A40,40 0 0,0 0,-40 Z" fill="url(#g1)" />
                  <path d="M56.57,-56.57 A80,80 0 0,1 80,0 L40,0 A40,40 0 0,0 28.28,-28.28 Z" fill="#1f6fb8" />
                  <path d="M80,0 A80,80 0 0,1 24.71,76.6 L12.36,38.3 A40,40 0 0,0 40,0 Z" fill="#0c4a8a" />
                  <path d="M24.71,76.6 A80,80 0 0,1 -80,0 L-40,0 A40,40 0 0,0 12.36,38.3 Z" fill="#072b45" />
                  {/* inner hole */}
                  <circle cx="0" cy="0" r="30" fill="#0b1220" />
                </g>
              </svg>
            </div>

            <div className="md:w-1/2">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-brand-400 to-brand-700" />
                  <div>
                    <div className="text-sm font-semibold">40% — Product & AI Infra ($200k)</div>
                    <div className="text-sm text-slate-300">Finalize production architecture, model fine-tuning, export pipeline (vectors & mockups).</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-3 w-3 rounded-full bg-[#1f6fb8]" />
                  <div>
                    <div className="text-sm font-semibold">30% — Pilot Integrations & Sales ($150k)</div>
                    <div className="text-sm text-slate-300">Onboard 3–5 merch customers, create integration templates for factories & distributors.</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-3 w-3 rounded-full bg-[#0c4a8a]" />
                  <div>
                    <div className="text-sm font-semibold">20% — Customer Success & Support ($100k)</div>
                    <div className="text-sm text-slate-300">Pilot support, onboarding, QA for production exports.</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-3 w-3 rounded-full bg-[#072b45]" />
                  <div>
                    <div className="text-sm font-semibold">10% — Legal & Operations ($50k)</div>
                    <div className="text-sm text-slate-300">IP, contracts, data licensing, and compliance.</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Slide 3 - Timeline & Milestones */}
        <section className="rounded-2xl bg-slate-800/40 p-8 border border-white/6">
          <h2 className="text-2xl font-bold">Milestones & Timeline</h2>
          <div className="mt-6">
            <ol className="relative border-l border-white/6 pl-6 space-y-8">
              <li>
                <span className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-bold">1</span>
                <div className="ml-2">
                  <div className="font-semibold">0–6 months — Production & Pilot signings</div>
                  <div className="text-sm text-slate-300">Complete infra, harden model, sign first 1–2 pilot integrations.</div>
                </div>
              </li>
              <li>
                <span className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold">2</span>
                <div className="ml-2">
                  <div className="font-semibold">6–12 months — Live pilots & early revenue</div>
                  <div className="text-sm text-slate-300">Get 3–5 pilots live; instrument conversion metrics (designs → approvals → orders).</div>
                </div>
              </li>
              <li>
                <span className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-400 text-xs font-bold">3</span>
                <div className="ml-2">
                  <div className="font-semibold">12–18 months — Convert to paid accounts</div>
                  <div className="text-sm text-slate-300">Achieve $200–500k ARR and sign at least one distribution partner.</div>
                </div>
              </li>
              <li>
                <span className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-xs font-bold">4</span>
                <div className="ml-2">
                  <div className="font-semibold">18–24 months — Ready for Series A</div>
                  <div className="text-sm text-slate-300">Proven growth, low churn, repeatable GTM — positioned for a $10M+ Series A.</div>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Small footer */}
        <div className="text-xs text-slate-500">Slide draft generated for SwagLab.ai • Use in seed pitch deck (editable React/Tailwind component)</div>
      </div>
    </div>
  );
}
