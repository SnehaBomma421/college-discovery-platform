"use client";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <div>
      <input
        type="text"
        placeholder="Search colleges..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg border bg-white text-black"
      />
      <div className="grid md:grid-cols-2 gap-4 mb-6">
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-3 rounded-lg border bg-white text-black"
      >
        <option value="">All Locations</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Pilani">Pilani</option>
        <option value="Warangal">Warangal</option>
      </select>

      <select
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
        className="p-3 rounded-lg border bg-white text-black"
      >
        <option value="">All Ratings</option>
        <option value="4">4+</option>
        <option value="4.5">4.5+</option>
        <option value="4.8">4.8+</option>
      </select>
    </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredColleges.map((college) => (
            <Link
  href={`/college/${college.id}`}
  key={college.id}
  className="border rounded-xl p-5 block hover:border-blue-500 transition"
>
            <h2 className="text-xl font-bold mb-2">
              {college.name}
            </h2>

            <p>{college.location}</p>

            <p className="mt-2">
              Rating: {college.rating}
            </p>

            <p>
              Fees: ₹{college.fees.toLocaleString("en-IN")}
            </p>

            <p className="mt-2">
              {college.overview}
            </p>

            <p className="mt-2 font-medium">
              {college.placements}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}