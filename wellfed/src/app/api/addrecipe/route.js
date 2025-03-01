const mongodb = require("mongodb");
import clientPromise from "@/lib/mongodb";

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db("users");
        const users = db.collection("users");

        const {username, recipeName, type} = await req.json();

        const user = await users.findOne({ username });
        
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 403 });
        }

        if (type === "whitelist") {
            await users.updateOne(
                { username },
                { $push: { recipe_whitelist: recipeName } }
            );
        } else if (type === "blacklist") {
            await users.updateOne(
                { username },
                { $push: { recipe_blacklist: recipeName } }
            );
        }

        return NextResponse.json({ message: "Recipe added to database" }, { status: 200 });


    } catch (error) {
        console.error('Error:', error);
    }   
}