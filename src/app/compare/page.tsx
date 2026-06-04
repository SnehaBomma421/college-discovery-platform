import { prisma } from "@/lib/prisma";
import { Star, IndianRupee, MapPin, Briefcase, GraduationCap, ChevronRight } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/Badge";

export default async function ComparePage() {
  const colleges = await prisma.college.findMany();

  return (
    <main className="min-h-screen pb-20 px-6">
      <div className="max-w-7xl mx-auto pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
              Side-by-Side Comparison
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Compare <span className="text-gradient">Colleges</span>
            </h1>
          </div>
          <p className="text-slate-400 max-w-md">
            Compare key metrics across different institutions to make an informed decision about your academic future.
          </p>
        </div>

        <div className="glass rounded-3xl overflow-hidden border-white/5 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider sticky left-0 glass z-30">College Entity</th>
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider">Location</th>
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider text-center">Student Rating</th>
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider">Annual Fees</th>
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider">Placement Record</th>
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {colleges.map((college) => (
                  <tr key={college.id} className="group hover:bg-white/5 transition-colors">
                    <td className="p-6 sticky left-0 glass z-20 group-hover:bg-slate-900/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <GraduationCap size={20} />
                        </div>
                        <span className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                          {college.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex items-center gap-2 text-slate-300 font-medium">
                        <MapPin size={16} className="text-slate-500" />
                        {college.location}
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex justify-center">
                        <Badge variant="success" icon={<Star size={12} className="fill-emerald-400" />}>
                          {college.rating}
                        </Badge>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex items-center gap-1.5 text-white font-bold">
                        <IndianRupee size={16} className="text-slate-500" />
                        {college.fees.toLocaleString("en-IN")}
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Briefcase size={16} className="text-slate-500" />
                        <span className="text-sm font-medium">{college.placements}</span>
                      </div>
                    </td>

                    <td className="p-6 text-right">
                      <Link 
                        href={`/college/${college.id}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        Details
                        <ChevronRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-12 p-8 glass rounded-3xl border-dashed border-white/10 text-center">
          <p className="text-slate-400 mb-6 font-medium">Need recommendations based on your rank?</p>
          <Link 
            href="/predictor"
            className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:bg-slate-200 transition-all inline-block"
          >
            Switch to Predictor Tool
          </Link>
        </div>
      </div>
    </main>
  );
}