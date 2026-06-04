import CollegeSearch from "@/components/CollegeSearch";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Sparkles, BarChart2, Zap } from "lucide-react";

export default async function Home() {
  const colleges = await prisma.college.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedColleges = colleges.map((college) => ({
    ...college,
    createdAt: college.createdAt.toISOString(),
  }));

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in">
            <Sparkles size={14} />
            The Future of College Search
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
            Find Your Dream <br />
            <span className="text-gradient">College Today</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Revolutionizing the way you discover, compare, and get predicted colleges. 
            Data-driven insights for your academic journey.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/compare"
              className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <BarChart2 size={20} />
              Compare Colleges
            </Link>

            <Link
              href="/predictor"
              className="px-8 py-4 rounded-2xl glass text-white font-bold hover:bg-white/5 transition-all flex items-center gap-2 border border-white/10"
            >
              <Zap size={20} />
              Predictor Tool
            </Link>
          </div>
        </div>
      </section>

      {/* Search & Listing Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <CollegeSearch colleges={serializedColleges} />
        </div>
      </section>
    </main>
  );
}