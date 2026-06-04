import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'outline';
  icon?: React.ReactNode;
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'outline', 
  icon,
  className = '' 
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors';
  
  const variants = {
    primary: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    secondary: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    accent: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    outline: 'border border-white/10 text-slate-400 hover:border-white/20'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
