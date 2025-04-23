import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnection";


export async function GET() {
  await connectDB();

  // const products = await Product.find();
  // return NextResponse.json({ products });
}
