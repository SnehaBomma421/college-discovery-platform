import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { rank } = await req.json();

    if (!rank || rank <= 0) {
      return NextResponse.json(
        { error: "Please enter a valid rank." },
        { status: 400 }
      );
    }

    let colleges;

    if (rank <= 3000) {
      colleges = await prisma.college.findMany({
        where: { rating: { gte: 4.8 } },
        orderBy: { rating: "desc" },
        take: 8,
      });
    } else if (rank <= 10000) {
      colleges = await prisma.college.findMany({
        where: { rating: { gte: 4.7 } },
        orderBy: { rating: "desc" },
        take: 6,
      });
    } else if (rank <= 25000) {
      colleges = await prisma.college.findMany({
        where: { rating: { gte: 4.5 } },
        orderBy: { rating: "desc" },
        take: 5,
      });
    } else if (rank <= 50000) {
      colleges = await prisma.college.findMany({
        where: { rating: { gte: 4.4 } },
        orderBy: { rating: "desc" },
        take: 3,
      });
    } else {
      colleges = await prisma.college.findMany({
        where: { rating: { lte: 4.5 } },
        orderBy: { rating: "desc" },
        take: 2,
      });
    }

    return NextResponse.json(colleges);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}