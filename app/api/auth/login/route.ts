import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";
import User from "@/models/User";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email & password required" }, { status: 400 });
  }

  await connectDB();

  // fetch password explicitly
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const accessToken = signAccessToken({ userId: user._id });
  const refreshToken = signRefreshToken({ userId: user._id });

  const res = NextResponse.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    accessToken,
  });
  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return res;
}
