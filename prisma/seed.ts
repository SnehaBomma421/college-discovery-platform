import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "IIT Hyderabad",
        location: "Hyderabad",
        fees: 1200000,
        rating: 4.8,
        overview: "Premier engineering institute.",
        placements: "Average package 24 LPA",
      },
      {
        name: "IIIT Hyderabad",
        location: "Hyderabad",
        fees: 1400000,
        rating: 4.9,
        overview: "Top computer science institute.",
        placements: "Average package 32 LPA",
      },
      {
        name: "BITS Pilani",
        location: "Pilani",
        fees: 2500000,
        rating: 4.7,
        overview: "Private engineering institute.",
        placements: "Average package 22 LPA",
      },
      {
        name: "NIT Warangal",
        location: "Warangal",
        fees: 900000,
        rating: 4.5,
        overview: "National Institute of Technology.",
        placements: "Average package 18 LPA",
      }
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });