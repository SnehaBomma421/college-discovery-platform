import { prisma } from "@/lib/prisma";

export default async function ComparePage() {
  const colleges = await prisma.college.findMany();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        Compare Colleges
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-3">College</th>
              <th className="border p-3">Location</th>
              <th className="border p-3">Rating</th>
              <th className="border p-3">Fees</th>
              <th className="border p-3">Placements</th>
            </tr>
          </thead>

          <tbody>
            {colleges.map((college) => (
              <tr key={college.id}>
                <td className="border p-3">
                  {college.name}
                </td>

                <td className="border p-3">
                  {college.location}
                </td>

                <td className="border p-3">
                  {college.rating}
                </td>

                <td className="border p-3">
                  ₹{college.fees.toLocaleString("en-IN")}
                </td>

                <td className="border p-3">
                  {college.placements}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}