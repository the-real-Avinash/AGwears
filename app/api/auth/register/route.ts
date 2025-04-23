import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";
import User from "@/models/User";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  
  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  await connectDB();

  // 2. Prevent duplicate signup
  if (await User.findOne({ email })) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  // 3. Create user (password is hashed in UserSchema.pre("save"))
  const user = await User.create({ name, email, password });

  // 4. Issue tokens
  const accessToken = signAccessToken({ userId: user._id });
  const refreshToken = signRefreshToken({ userId: user._id });

  // 5. Set HttpOnly refresh‑token cookie & return access token + user info
  const res = NextResponse.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    accessToken,
  });

  
  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });

  return res;
}
