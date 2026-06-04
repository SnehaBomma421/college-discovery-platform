import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, Star, IndianRupee, BookOpen, Briefcase, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/Badge";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CollegeDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const college = await prisma.college.findUnique({
    where: {
      id: id,
    },
  });

  if (!college) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-20">
      {/* College Hero */}
      <section className="relative pt-12 pb-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Discovery
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="primary" icon={<BookOpen size={14} />}>Higher Education</Badge>
                <Badge variant="success" icon={<Star size={14} className="fill-emerald-400" />}>{college.rating} Rating</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                {college.name}
              </h1>
              <div className="flex items-center gap-2 text-xl text-slate-400">
                <MapPin size={20} className="text-blue-500" />
                <span>{college.location}</span>
              </div>
            </div>

            <div className="glass p-6 rounded-3xl border-white/10 min-w-[240px]">
              <span className="text-sm text-slate-400 uppercase tracking-wider font-semibold block mb-1">Annual Investment</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white leading-none">
                  ₹{college.fees.toLocaleString("en-IN")}
                </span>
                <span className="text-slate-500 text-sm italic">/ year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="px-6 -mt-12 relative z-20">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="glass rounded-3xl p-8 border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Info size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Overview</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                {college.overview}
              </p>
            </div>

            <div className="glass rounded-3xl p-8 border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Briefcase size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Placement Highlights</h2>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xl text-emerald-400 font-semibold leading-relaxed">
                  {college.placements}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
             <div className="glass rounded-3xl p-8 border-white/5 sticky top-32">
                <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400">
                      <Star size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Rating</p>
                      <p className="text-white font-bold">{college.rating} / 5.0</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400">
                      <IndianRupee size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Global Fees</p>
                      <p className="text-white font-bold">₹{college.fees.toLocaleString("en-IN")}</p>
                    </div>
                  </div>

                   <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Location</p>
                      <p className="text-white font-bold">{college.location}</p>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/compare"
                  className="w-full mt-10 py-4 rounded-xl bg-blue-600 text-white font-bold text-center block hover:bg-blue-500 transition-colors"
                >
                  Compare with others
                </Link>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}