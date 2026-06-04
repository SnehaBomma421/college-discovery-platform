import Link from 'next/link';
import { MapPin, Star, IndianRupee, ArrowRight, BookOpen } from 'lucide-react';
import Badge from './Badge';

type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  overview: string;
  placements: string;
};

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  return (
    <div className="group glass glass-hover rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
          <BookOpen size={24} />
        </div>
        <Badge variant="success" icon={<Star size={12} className="fill-emerald-400" />}>
          {college.rating}
        </Badge>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
        {college.name}
      </h3>

      <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
        <MapPin size={14} />
        <span>{college.location}</span>
      </div>

      <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10">
        {college.overview}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Annual Fees</span>
          <div className="flex items-center text-white font-bold">
            <IndianRupee size={14} />
            <span>{college.fees.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <Link 
          href={`/college/${college.id}`}
          className="flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors"
        >
          Details
          <ArrowRight size={16} />
        </Link>
      </div>
      
      <div className="mt-4">
        <Badge variant="primary" className="w-full justify-center py-1.5">
          {college.placements}
        </Badge>
      </div>
    </div>
  );
}
