import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen">
      {/* Decorative backdrop */}
      <div className="pointer-events-none fixed inset-0 bg-hero bg-grid bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"></div>

      {/* Hero Section */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:pt-12 lg:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Now booking pilot partners
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                AI‑powered merch design at scale — <span className="text-brand-400">instant</span>, professional, limitless.
              </h1>
              <p className="mt-4 text-slate-300">
                SwagLab.ai eliminates design bottlenecks by automatically generating unique, brand‑ready apparel collections in seconds so merch companies can focus on selling and fulfilling orders.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn-primary">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary">
                      Get Started
                    </Link>
                    <Link to="/login" className="btn-secondary">
                      Sign In
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
            <div className="relative reveal">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-2 shadow-2xl shadow-black/40">
                <div className="relative h-[440px] w-full overflow-hidden rounded-xl bg-slate-900/70">
                  {/* Mock UI */}
                  <div className="absolute inset-0 grid grid-cols-3 gap-3 p-4">
                    <div className="col-span-1 space-y-3">
                      <div className="h-10 rounded-lg bg-white/5"></div>
                      <div className="h-10 rounded-lg bg-white/5"></div>
                      <div className="h-10 rounded-lg bg-white/5"></div>
                      <div className="h-10 rounded-lg bg-white/5"></div>
                    </div>
                    <div className="col-span-2 grid grid-rows-6 gap-3">
                      <div className="row-span-3 rounded-xl bg-white/5"></div>
                      <div className="row-span-3 grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-white/5"></div>
                        <div className="rounded-xl bg-white/5"></div>
                        <div className="rounded-xl bg-white/5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg bg-slate-950/60 px-4 py-2 text-xs backdrop-blur">
                    <span>Brand: Acme • Theme: Summer Drop • 24 designs generated</span>
                    <button className="rounded-md bg-brand-500 px-3 py-1 font-semibold text-white hover:bg-brand-400">Export print‑ready</button>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-slate-400">Conceptual UI mock — not actual app screens</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal text-center">
            <h2 className="text-2xl font-bold">Built for merch companies</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m6-6H6"/>
                  </svg>
                ),
                title: "Unlimited creativity",
                description: "Generate dozens of on‑brand ideas instantly to kick‑start the sale."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7h18M6 12h12M8 17h8"/>
                  </svg>
                ),
                title: "Brand‑safe outputs",
                description: "Honor color palettes, fonts, and guardrails with guided prompts."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h10M7 12h8M7 16h6"/>
                  </svg>
                ),
                title: "Collaboration tools",
                description: "Comment, version, and approve collections with your team and buyer."
              }
            ].map((feature, index) => (
              <div key={index} className="reveal rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20">
                  {feature.icon}
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="reveal rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-xl font-bold">Ready to accelerate your pipeline?</h3>
                <p className="mt-3 text-slate-300">
                  Join the pilot program and get early access to SwagLab.ai's AI-powered design tools.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn-primary">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary">
                      Join the Pilot
                    </Link>
                    <Link to="/login" className="btn-secondary">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 grid place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7h18M6 12h12M8 17h8"/>
                </svg>
              </div>
              <span className="text-sm font-semibold">SwagLab.ai</span>
            </div>
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} SwagLab.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <script>
        {`
          // Reveal on scroll
          const io = new IntersectionObserver((entries) => {
            entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
          }, { threshold: 0.12 });
          document.querySelectorAll('.reveal').forEach(el => io.observe(el));
        `}
      </script>
    </div>
  );
};
