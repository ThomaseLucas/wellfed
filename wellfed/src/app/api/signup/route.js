import clientPromise from "../../../lib/mongodb.js";
const bcrypt = require("bcrypt");

import { NextResponse } from "next/server.js";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("users");
    const users = db.collection("users");


    const { username, password } = await req.json();


    if (!username || !password) {
      return  NextResponse.json({ error: 'Username and Password are required' }, { status: 400 });
    }

    const user = await db.collection("users").findOne({ username });
    if (user) {
        return NextResponse.json({ error: 'User Already Exists' }, { status: 403 })
    }


    bcrypt.hash(password, 10, async function(err, hash) {
        

    let newUser = {
        user_id: 1,
        username: `${username}`,
        password: `${hash}`,
        recipe_blacklist: [],
        recipe_whitelist: [],
        weekly_recipes: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
        },
    };

    await users.insertOne(newUser);

    });
    return new NextResponse({ error: 'User Created' }, { status: 200 });



    } catch (error) {
    console.error(error);
        return new NextResponse({ error: 'Internal Server Error' }, { status: 500 });
    }
}

