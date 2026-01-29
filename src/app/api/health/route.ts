import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Query leve para acordar o banco (Neon)
    await db.$queryRaw`SELECT 1`;
    
    return NextResponse.json(
      { status: "ok", message: "Database is warm and ready" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      { status: "error", message: "Database connection failed" },
      { status: 500 }
    );
  }
}
