"use client";
import { useState } from "react";
import { Search, MapPin, Star, SlidersHorizontal } from "lucide-react";
import CollegeCard from "./CollegeCard";

type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  overview: string;
  placements: string;
  createdAt: string;
};

interface Props {
  colleges: College[];
}

export default function CollegeSearch({ colleges }: Props) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minRating, setMinRating] = useState("");

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesLocation =
      location === "" || college.location === location;

    const matchesRating =
      minRating === "" ||
      college.rating >= Number(minRating);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesRating
    );
  });

  const uniqueLocations = Array.from(new Set(colleges.map(c => c.location)));

  return (
    <div className="space-y-10">
      {/* Search and Filters Bar */}
      <div className="glass rounded-3xl p-4 md:p-6 flex flex-col lg:flex-row gap-4 items-center shadow-2xl shadow-black/50 border-white/5">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Search by college name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500"
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-48">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer transition-all hover:bg-white/10"
            >
              <option value="" className="bg-slate-900">All Locations</option>
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc} className="bg-slate-900">{loc}</option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 lg:w-48">
            <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer transition-all hover:bg-white/10"
            >
              <option value="" className="bg-slate-900">All Ratings</option>
              <option value="4" className="bg-slate-900">4+ Stars</option>
              <option value="4.5" className="bg-slate-900">4.5+ Stars</option>
              <option value="4.8" className="bg-slate-900">4.8+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <SlidersHorizontal className="text-blue-500" size={24} />
          {filteredColleges.length} {filteredColleges.length === 1 ? 'College' : 'Colleges'} Found
        </h2>
      </div>

      {filteredColleges.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-3xl p-20 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={40} className="text-slate-600" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No colleges found</h3>
          <p className="text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}