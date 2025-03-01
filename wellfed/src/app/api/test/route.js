import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("api route hit!");

    try {
    const client = await clientPromise;
    console.log("Connected to MongoDB!");
    const db = client.db();
    console.log("Connected to the 'users' collection!");


    // Check if the connection works by fetching any users
    const users = await db.collection("users").find().limit(5).toArray();

    return NextResponse.json({ message: "Connected to MongoDB!", users });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return NextResponse.json({ message: "Database connection failed!" }, { status: 500 });
  }
}
