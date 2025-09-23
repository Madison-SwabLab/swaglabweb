import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/utils/cn';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: location.pathname === '/dashboard' },
    { name: 'Jobs', href: '/dashboard', current: location.pathname.startsWith('/jobs') },
    { name: 'Designs', href: '/dashboard', current: location.pathname.startsWith('/designs') },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex items-center justify-between py-6">
            <Link to="/" className="group inline-flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-glow grid place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7h18M6 12h12M8 17h8"/>
                </svg>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                SwagLab<span className="text-brand-400">.ai</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'hover:text-brand-300 transition-colors',
                    item.current ? 'text-brand-400' : 'text-slate-300'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-300">
                <div className="h-8 w-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <span className="text-xs font-semibold">
                    {user?.firstName?.[0] || user?.username?.[0] || 'U'}
                  </span>
                </div>
                <span>{user?.username || 'User'}</span>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                <span>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};
