"use client";

import { useState } from "react";
import { Zap, Search, Loader2, Sparkles, AlertCircle } from "lucide-react";
import CollegeCard from "@/components/CollegeCard";
import Link from "next/link";

type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  overview: string;
  placements: string;
};

export default function PredictorPage() {
  const [rank, setRank] = useState("");
  const [results, setResults] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handlePredict() {
  const rankNumber = Number(rank);

  if (
    !Number.isInteger(rankNumber) ||
    rankNumber <= 0
  ) {
    alert(
      "Please enter a valid positive whole-number rank."
    );
    return;
  }

  try {
    setLoading(true);
    setHasSearched(true);

    const res = await fetch("/api/predictor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rank: rankNumber,
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    setResults(data);
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen pb-20 px-6">
      <div className="max-w-7xl mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles size={14} />
            AI-Powered Recommendations
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            College <span className="text-gradient">Predictor</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Enter your entrance exam rank to find the best-fitting colleges tailored to your performance.
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="glass rounded-3xl p-8 border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-blue-500/10 group-hover:text-blue-500/20 transition-colors">
              <Zap size={120} />
            </div>
            
            <div className="relative z-10">
              <label htmlFor="rank" className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                Your Entrance Rank
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input
                    id="rank"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="e.g. 1500"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-xl font-bold"
                  />
                </div>
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                >
                  {loading ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <>
                      <Zap size={20} />
                      Predict Results
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
            <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mb-6" />
            <p className="text-xl font-bold text-white mb-2 italic tracking-tight">Analyzing Institutions...</p>
            <p className="text-slate-400 font-medium">Matching your rank with thousands of data points</p>
          </div>
        ) : (
          <>
            {hasSearched && results.length > 0 && (
              <div className="space-y-10 animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Sparkles className="text-blue-500" />
                    Recommended for You
                  </h2>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>
              </div>
            )}

            {hasSearched && results.length === 0 && !loading && (
              <div className="glass rounded-3xl p-20 text-center border-dashed border-white/10">
                <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                  <AlertCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No matching colleges</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Unfortunately, we couldn't find any direct matches for your rank. 
                  Try exploring our <Link href="/" className="text-blue-500 hover:underline">full catalog</Link> instead.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
