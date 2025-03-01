import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) { 
    console.log("Received POST /api/signin request");

    try {
        const client = await clientPromise;
        const db = client.db("users"); // Ensure correct database
        const users = db.collection("users");

        const body = await req.json();
        console.log("Received Data:", body);

        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
        }

        const user = await users.findOne({ username });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 403 });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 403 });
        }

        console.log("User authenticated:", username);
        return NextResponse.json({ username });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
