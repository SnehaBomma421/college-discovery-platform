export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return NextResponse.json({
    message: "Predictor API working",
  });
}

export async function POST(req: NextRequest) {
  try {
    const { rank } = await req.json();

    if (!rank || rank <= 0) {
      return NextResponse.json(
        { error: "Please enter a valid rank" },
        { status: 400 }
      );
    }

    const colleges = await prisma.college.findMany();

    let recommendations = [];

    if (rank <= 5000) {
      recommendations = colleges.filter(
        (c) =>
          c.name.includes("IIT") ||
          c.name.includes("IIIT")
      );
    } else if (rank <= 15000) {
      recommendations = colleges.filter(
        (c) =>
          c.name.includes("IIIT") ||
          c.name.includes("BITS")
      );
    } else if (rank <= 30000) {
      recommendations = colleges.filter(
        (c) =>
          c.name.includes("BITS") ||
          c.name.includes("NIT")
      );
    } else {
      recommendations = colleges.filter(
        (c) =>
          c.name.includes("NIT")
      );
    }

    return NextResponse.json(recommendations);
  } catch {
    return NextResponse.json(
      { error: "Prediction failed" },
      { status: 500 }
    );
  }
}