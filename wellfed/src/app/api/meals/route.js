import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(req) {
    console.log("Received GET /api/meals request");

    try {
        const client = await clientPromise; //waits for connection to be established
        const db = client.db("users"); //connects to the correct database
        const usersCollection = db.collection("users"); //connects to the correct collection

        //TODO() add auth logic, so it recognizes which user is currently logged in
        const user = await usersCollection.findOne({ username: "test" });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 403 });
        }

        const recipeWhiteList = user.recipe_whitelist;

        if (!recipeWhiteList || recipeWhiteList.length < 7){
            return NextResponse.json({ message: "Not enough recipes in whitelist" }, { status: 403 });
        }
        
        const selectedIndexes = new Set();
        while (selectedIndexes.size < Math.min(7, recipeWhiteList.length)){
            const index = Math.floor(Math.random() * recipeWhiteList.length);
            selectedIndexes.add(index);
            console.log("Selected index:", index);
        }

        const selectedRecipes = [];
        for (let index of selectedIndexes){
            selectedRecipes.push(recipeWhiteList[index]);
            console.log("Selected recipe:", recipeWhiteList[index]);
        }

        console.log("Selected recipes:", selectedRecipes);
        return NextResponse.json({ selectedRecipes });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}