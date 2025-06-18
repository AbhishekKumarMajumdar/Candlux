// Example: app/api/admin/onlyadmin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, requireRole } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  const { valid, decoded } = verifyToken(token);

  if (!valid || !requireRole(decoded, "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.json({ message: "Welcome admin" });
}
