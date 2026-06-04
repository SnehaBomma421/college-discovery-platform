import CollegeSearch from "@/components/CollegeSearch";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

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
    <main className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          College Discovery Platform
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Discover, compare and predict the best colleges for your future.
          Search colleges, compare placements, and find suitable options
          based on your rank.
        </p>
      </div>

      {/* Search & Filters */}
      <CollegeSearch colleges={serializedColleges} />

      {/* Navigation Buttons */}
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Link
          href="/compare"
          className="
            px-6 py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            transition
            font-medium
            text-white
          "
        >
          Compare Colleges
        </Link>

        <Link
          href="/predictor"
          className="
            px-6 py-3
            rounded-xl
            bg-green-600
            hover:bg-green-700
            transition
            font-medium
            text-white
          "
        >
          Predictor Tool
        </Link>
      </div>
    </main>
  );
}