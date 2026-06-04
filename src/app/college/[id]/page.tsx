import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

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
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">
        {college.name}
      </h1>

      <div className="space-y-4">
        <p>
          <strong>Location:</strong> {college.location}
        </p>

        <p>
          <strong>Rating:</strong> {college.rating}
        </p>

        <p>
          <strong>Fees:</strong> ₹{college.fees.toLocaleString("en-IN")}
        </p>

        <p>
          <strong>Overview:</strong> {college.overview}
        </p>

        <p>
          <strong>Placements:</strong> {college.placements}
        </p>
      </div>
    </main>
  );
}