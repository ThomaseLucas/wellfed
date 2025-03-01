import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Function to generate a new meal plan (same logic as before)
async function fetchRecipeDetails(recipeName) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(recipeName)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.meals ? data.meals[0] : null; // Return the first meal found
}

async function generateMealPlan(username, usersCollection) {
    console.log("🔹 Generating new meal plan...");

    const user = await usersCollection.findOne({ username });
    if (!user) return null;

    const recipeNames = user.recipe_whitelist || [];
    let breakfastRecipes = [];
    let dinnerRecipes = [];

    // Shuffle the recipeNames array
        for (let i = recipeNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [recipeNames[i], recipeNames[j]] = [recipeNames[j], recipeNames[i]];
        }

    // Simulating fetching recipe details (Replace this with actual API calls)
    for (const recipeName of recipeNames) {
        // Fetch from MealDB (Replace with actual fetch logic)
        const meal = await fetchRecipeDetails(recipeName);
        if (!meal) continue;
        
        if (meal.strCategory === "Breakfast") {
            breakfastRecipes.push(meal.strMeal);
        } 
        else if (meal.strCategory === "Miscellaneous") {
            continue;
        }
        else {
            dinnerRecipes.push(meal.strMeal);
        }
    }

    while (breakfastRecipes.length < 7) breakfastRecipes.push("No meal available");
    while (dinnerRecipes.length < 7) dinnerRecipes.push("No meal available");

    const mealPlan = {
        Monday: [breakfastRecipes[0], dinnerRecipes[0]],
        Tuesday: [breakfastRecipes[1], dinnerRecipes[1]],
        Wednesday: [breakfastRecipes[2], dinnerRecipes[2]],
        Thursday: [breakfastRecipes[3], dinnerRecipes[3]],
        Friday: [breakfastRecipes[4], dinnerRecipes[4]],
        Saturday: [breakfastRecipes[5], dinnerRecipes[5]],
        Sunday: [breakfastRecipes[6], dinnerRecipes[6]],
    };

    // Store the meal plan in MongoDB
    await usersCollection.updateOne(
        { username },
        { $set: { meal_plan: mealPlan } }
    );

    console.log("New meal plan generated and stored.");
    return mealPlan;
}

// **GET Route: Fetch Existing or Generate a New Meal Plan**
export async function GET(req) {
    try {
        const client = await clientPromise;
        const db = client.db("users");
        const usersCollection = db.collection("users");

        // TODO: Replace with actual authentication logic
        const username = "test";
        const user = await usersCollection.findOne({ username });

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 403 });

        if (user.meal_plan) {
            console.log("Returning existing meal plan from database.");
            return NextResponse.json({ mealPlan: user.meal_plan });
        }

        // No meal plan exists → Generate a new one
        const newMealPlan = await generateMealPlan(username, usersCollection);
        return NextResponse.json({ mealPlan: newMealPlan });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// **POST Route: Force Regenerate a Meal Plan**
export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db("users");
        const usersCollection = db.collection("users");

        // TODO: Replace with actual authentication logic
        const username = "test";
        const newMealPlan = await generateMealPlan(username, usersCollection);
        
        return NextResponse.json({ mealPlan: newMealPlan });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
