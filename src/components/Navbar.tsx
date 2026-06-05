"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Search, BarChart2, Zap, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const navItems = [
    { name: 'Search', href: '/', icon: Search },
    { name: 'Compare', href: '/compare', icon: BarChart2 },
    { name: 'Predictor', href: '/predictor', icon: Zap },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-blue-600 group-hover:bg-blue-500 transition-colors">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Edu<span className="text-blue-500">Discover</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive 
                        ? 'bg-white/10 text-white' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}

          {user && <div className="h-4 w-px bg-white/10" />}

          {loading ? (
            <div className="w-20 h-9 rounded-lg bg-white/5 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300 font-medium">
                Hi, <span className="text-white font-semibold">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 transition-all cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            pathname !== "/login" && (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all cursor-pointer shadow-lg shadow-blue-600/10"
              >
                <LogIn size={16} />
                Login
              </Link>
            )
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <Link href="/predictor" className="p-2 rounded-lg glass text-slate-400">
              <Zap size={20} />
            </Link>
          )}
          {!loading && (
            user ? (
              <button
                onClick={logout}
                className="p-2 rounded-lg glass text-slate-400 hover:text-white transition-all cursor-pointer"
                title={`Logout (${user.name})`}
              >
                <LogOut size={20} />
              </button>
            ) : (
              pathname !== "/login" && (
                <Link
                  href="/login"
                  className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all cursor-pointer"
                  title="Login"
                >
                  <LogIn size={20} />
                </Link>
              )
            )
          )}
        </div>
      </div>
    </nav>
  );
}
