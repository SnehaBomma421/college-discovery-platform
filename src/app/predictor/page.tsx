"use client";

import { useState } from "react";

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

  async function handlePredict() {
    if (Number(rank) <= 0) {
      alert("Please enter a valid rank");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/predictor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rank: Number(rank),
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
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        College Predictor
      </h1>

      <div className="max-w-md space-y-4">
        <input
          type="number"
          min="1"
          placeholder="Enter Rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="w-full p-3 border rounded-lg bg-white text-black"
        />

        <button
          onClick={handlePredict}
          className="bg-green-600 px-4 py-2 rounded-lg text-white"
        >
          Predict Colleges
        </button>
      </div>

      {loading && (
        <p className="mt-6">
          Predicting...
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {results.map((college) => (
            <div
              key={college.id}
              className="border rounded-xl p-5"
            >
              <h2 className="text-xl font-bold">
                {college.name}
              </h2>

              <p>{college.location}</p>

              <p>Rating: {college.rating}</p>

              <p>
                Fees: ₹{college.fees.toLocaleString("en-IN")}
              </p>

              <p>{college.placements}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}