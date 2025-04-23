import jwt from "jsonwebtoken";

const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

if (!JWT_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("Missing JWT secrets in env");
}

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, JWT_SECRET) as any;

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_TOKEN_SECRET) as any;
