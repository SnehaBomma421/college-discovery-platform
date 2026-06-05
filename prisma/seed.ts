import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.college.deleteMany();

  await prisma.college.createMany({
    data: [
      {
        name: "IIT Bombay",
        location: "Mumbai",
        fees: 240000,
        rating: 4.9,
        overview: "Premier engineering institute.",
        placements: "Average Package ₹28 LPA",
      },
      {
        name: "IIT Delhi",
        location: "Delhi",
        fees: 235000,
        rating: 4.9,
        overview: "Top technology institute.",
        placements: "Average Package ₹27 LPA",
      },
      {
        name: "IIT Madras",
        location: "Chennai",
        fees: 230000,
        rating: 4.9,
        overview: "Leading engineering and research institute.",
        placements: "Average Package ₹26 LPA",
      },
      {
        name: "IIT Kanpur",
        location: "Kanpur",
        fees: 225000,
        rating: 4.8,
        overview: "Known for innovation and academics.",
        placements: "Average Package ₹24 LPA",
      },
      {
        name: "IIT Kharagpur",
        location: "Kharagpur",
        fees: 220000,
        rating: 4.8,
        overview: "Oldest IIT in India.",
        placements: "Average Package ₹23 LPA",
      },
      {
        name: "IIT Hyderabad",
        location: "Hyderabad",
        fees: 210000,
        rating: 4.8,
        overview: "Strong focus on AI and technology.",
        placements: "Average Package ₹22 LPA",
      },

      {
        name: "NIT Trichy",
        location: "Tiruchirappalli",
        fees: 180000,
        rating: 4.7,
        overview: "Top NIT in India.",
        placements: "Average Package ₹18 LPA",
      },
      {
        name: "NIT Warangal",
        location: "Warangal",
        fees: 175000,
        rating: 4.7,
        overview: "Highly reputed NIT.",
        placements: "Average Package ₹17 LPA",
      },
      {
        name: "NIT Surathkal",
        location: "Mangalore",
        fees: 170000,
        rating: 4.7,
        overview: "Excellent placement record.",
        placements: "Average Package ₹16 LPA",
      },
      {
        name: "NIT Calicut",
        location: "Calicut",
        fees: 165000,
        rating: 4.6,
        overview: "Strong academic culture.",
        placements: "Average Package ₹15 LPA",
      },
      {
        name: "NIT Rourkela",
        location: "Rourkela",
        fees: 160000,
        rating: 4.6,
        overview: "Popular engineering institution.",
        placements: "Average Package ₹14 LPA",
      },
      {
        name: "NIT Kurukshetra",
        location: "Kurukshetra",
        fees: 155000,
        rating: 4.5,
        overview: "Established NIT with strong alumni.",
        placements: "Average Package ₹13 LPA",
      },

      {
        name: "IIIT Hyderabad",
        location: "Hyderabad",
        fees: 320000,
        rating: 4.9,
        overview: "Top institute for Computer Science.",
        placements: "Average Package ₹30 LPA",
      },
      {
        name: "IIIT Bangalore",
        location: "Bangalore",
        fees: 300000,
        rating: 4.8,
        overview: "Strong software engineering programs.",
        placements: "Average Package ₹27 LPA",
      },
      {
        name: "IIIT Delhi",
        location: "Delhi",
        fees: 290000,
        rating: 4.7,
        overview: "Industry-focused curriculum.",
        placements: "Average Package ₹24 LPA",
      },
      {
        name: "IIIT Allahabad",
        location: "Prayagraj",
        fees: 280000,
        rating: 4.6,
        overview: "Known for IT programs.",
        placements: "Average Package ₹21 LPA",
      },
      {
        name: "IIIT Lucknow",
        location: "Lucknow",
        fees: 270000,
        rating: 4.5,
        overview: "Growing institute with strong placements.",
        placements: "Average Package ₹18 LPA",
      },

      {
        name: "BITS Pilani",
        location: "Pilani",
        fees: 550000,
        rating: 4.8,
        overview: "Premier private university.",
        placements: "Average Package ₹24 LPA",
      },
      {
        name: "BITS Goa",
        location: "Goa",
        fees: 540000,
        rating: 4.7,
        overview: "Renowned engineering campus.",
        placements: "Average Package ₹22 LPA",
      },
      {
        name: "BITS Hyderabad",
        location: "Hyderabad",
        fees: 530000,
        rating: 4.7,
        overview: "Strong placement records.",
        placements: "Average Package ₹21 LPA",
      },

      {
        name: "VIT Vellore",
        location: "Vellore",
        fees: 350000,
        rating: 4.5,
        overview: "Popular private engineering college.",
        placements: "Average Package ₹10 LPA",
      },
      {
        name: "SRM University",
        location: "Chennai",
        fees: 330000,
        rating: 4.4,
        overview: "Large private university.",
        placements: "Average Package ₹8 LPA",
      },
      {
        name: "Manipal Institute of Technology",
        location: "Manipal",
        fees: 420000,
        rating: 4.5,
        overview: "Well-known private institute.",
        placements: "Average Package ₹11 LPA",
      },
      {
        name: "Amrita Vishwa Vidyapeetham",
        location: "Coimbatore",
        fees: 310000,
        rating: 4.4,
        overview: "Highly regarded private university.",
        placements: "Average Package ₹9 LPA",
      },
      {
        name: "Thapar Institute of Engineering",
        location: "Patiala",
        fees: 400000,
        rating: 4.4,
        overview: "Strong engineering programs.",
        placements: "Average Package ₹10 LPA",
      },

      {
        name: "Jadavpur University",
        location: "Kolkata",
        fees: 50000,
        rating: 4.8,
        overview: "Prestigious public university.",
        placements: "Average Package ₹12 LPA",
      },
      {
        name: "DTU",
        location: "Delhi",
        fees: 190000,
        rating: 4.7,
        overview: "Top state engineering university.",
        placements: "Average Package ₹15 LPA",
      },
      {
        name: "NSUT",
        location: "Delhi",
        fees: 195000,
        rating: 4.7,
        overview: "Strong technical university.",
        placements: "Average Package ₹14 LPA",
      },
      {
        name: "COEP",
        location: "Pune",
        fees: 120000,
        rating: 4.6,
        overview: "Historic engineering college.",
        placements: "Average Package ₹11 LPA",
      },
      {
        name: "PEC Chandigarh",
        location: "Chandigarh",
        fees: 140000,
        rating: 4.5,
        overview: "Well-known engineering college.",
        placements: "Average Package ₹10 LPA",
      },
    ],
  });

  console.log("✅ 30 colleges seeded successfully!");
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