import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/protected")) {
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") && auth.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const payload = verifyAccessToken(token);
      // Optionally: inject user info into headers for downstream
      req.headers.set("x-user-id", payload.userId);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
  }

  // Let all other routes through
  return NextResponse.next();
}

export const config = {
  matcher: "/api/protected/:path*",
};
