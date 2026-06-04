"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Search, BarChart2, Zap } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

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

        <div className="hidden md:flex items-center gap-1">
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

        <div className="md:hidden">
          {/* Mobile menu could go here, for now keeping it simple */}
           <Link href="/predictor" className="p-2 rounded-lg glass text-slate-400">
            <Zap size={20} />
           </Link>
        </div>
      </div>
    </nav>
  );
}
