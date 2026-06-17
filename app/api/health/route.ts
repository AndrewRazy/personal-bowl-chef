import { NextResponse } from "next/server";
import { healthCheck } from "@/lib/ollama";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await healthCheck();
  return NextResponse.json(status);
}
