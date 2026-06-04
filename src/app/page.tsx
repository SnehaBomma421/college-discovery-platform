type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  overview: string;
  placements: string;
};

async function getColleges(): Promise<College[]> {
  const res = await fetch("http://localhost:3000/api/colleges", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const colleges = await getColleges();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        College Discovery Platform
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="border rounded-xl p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {college.name}
            </h2>

            <p>{college.location}</p>

            <p className="mt-2">
              Rating: {college.rating}
            </p>

            <p>
              Fees: ₹{college.fees.toLocaleString()}
            </p>

            <p className="mt-2 text-sm">
              {college.overview}
            </p>

            <p className="mt-2 font-medium">
              {college.placements}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}