import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [artists, opportunities] = await Promise.all([
    prisma.artist.count(),
    prisma.opportunity.count(),
  ]);

  return NextResponse.json({
    ok: true,
    database: "connected",
    artists,
    opportunities,
  });
}