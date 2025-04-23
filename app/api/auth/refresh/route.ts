import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { userId } = verifyRefreshToken(token);
    const newAccess = signAccessToken({ userId });
    const newRefresh = signRefreshToken({ userId });

    const res = NextResponse.json({ accessToken: newAccess });
    res.cookies.set("refreshToken", newRefresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });
  }
}
