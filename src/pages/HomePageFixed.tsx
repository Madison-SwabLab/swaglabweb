import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const HomePageFixed: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Decorative backdrop */}
      <div 
        className="pointer-events-none fixed inset-0"
        style={{
          background: 'radial-gradient(1200px 500px at 50% -10%, rgba(42,152,255,.25), transparent), radial-gradient(800px 400px at 80% -10%, rgba(255,255,255,.08), transparent)',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse_at_top,black,transparent_70%)'
        }}
      ></div>

      {/* Hero Section */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:pt-12 lg:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Now booking pilot partners
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                AI‑powered merch design at scale — <span className="text-blue-400">instant</span>, professional, limitless.
              </h1>
              <p className="mt-4 text-slate-300">
                SwagLab.ai eliminates design bottlenecks by automatically generating unique, brand‑ready apparel collections in seconds so merch companies can focus on selling and fulfilling orders.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 font-semibold hover:bg-slate-100">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 font-semibold hover:bg-slate-100">
                      Login
                    </Link>
                    <Link to="/register" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-white hover:bg-white/5">
                      Register
                    </Link>
                  </>
                )}
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
                <span>Trusted by merch veterans</span>
                <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                <span>ASI • PPAI • Trade‑show ready</span>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-2 shadow-2xl shadow-black/40">
                <div className="relative h-[440px] w-full overflow-hidden rounded-xl bg-slate-900/70">
                  {/* Hero Image */}
                  <img 
                    src="/img/hero.png" 
                    alt="SwagLab.ai Hero Interface" 
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg bg-slate-950/60 px-4 py-2 text-xs backdrop-blur">
                    <span>Brand: Acme • Theme: Summer Drop • 24 designs generated</span>
                    <button className="rounded-md bg-blue-500 px-3 py-1 font-semibold text-white hover:bg-blue-400">Export print‑ready</button>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-slate-400">Conceptual UI mock — not actual app screens</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="relative z-10 border-t border-white/10 bg-slate-950/60 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">The problem</h2>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-400"></span> Custom merch design is slow, expensive, and dependent on human designers.</li>
                <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-400"></span> Sales cycles drag due to manual creative steps and back‑and‑forth approvals.</li>
                <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-400"></span> Current configurators are generic, limited, and put the creative burden on the buyer.</li>
                <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-400"></span> Missed revenue when buyers delay or abandon because inspiration is lacking.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Our solution</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold">Fine‑tuned AI model</h3>
                  <p className="mt-2 text-sm text-slate-300">Trained on thousands of proven apparel designs — purpose‑built for branded merchandise.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold">Instant collections</h3>
                  <p className="mt-2 text-sm text-slate-300">Generate cohesive drops from brand guidelines, themes, or prompts in seconds.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold">Pitch & iterate fast</h3>
                  <p className="mt-2 text-sm text-slate-300">Enable sales to wow prospects without waiting on designers.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold">Production‑ready outputs</h3>
                  <p className="mt-2 text-sm text-slate-300">Export print‑ready files or mockups directly for production.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Built for merch companies</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m6-6H6"/></svg>
              </div>
              <h3 className="mt-4 font-semibold">Unlimited creativity</h3>
              <p className="mt-2 text-sm text-slate-300">Generate dozens of on‑brand ideas instantly to kick‑start the sale.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7h18M6 12h12M8 17h8"/></svg>
              </div>
              <h3 className="mt-4 font-semibold">Brand‑safe outputs</h3>
              <p className="mt-2 text-sm text-slate-300">Honor color palettes, fonts, and guardrails with guided prompts.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h10M7 12h8M7 16h6"/></svg>
              </div>
              <h3 className="mt-4 font-semibold">Collaboration tools</h3>
              <p className="mt-2 text-sm text-slate-300">Comment, version, and approve collections with your team and buyer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-700 grid place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7h18M6 12h12M8 17h8"/></svg>
              </div>
              <span className="text-sm font-semibold">SwagLab.ai</span>
            </div>
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} SwagLab.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
