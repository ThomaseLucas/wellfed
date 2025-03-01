"use client";

import { useState, useEffect } from "react";
import "../app/globals.css";
import Header from "./header";

// Fetch full recipe details from MealDB
async function fetchRecipeDetails(recipeName) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(recipeName)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
}

// Format instructions into steps
function formatInstructions(instructions) {
    if (!instructions) return ["No instructions available."];
    return instructions
        .split(".")
        .map(step => step.trim())
        .filter(step => step.length > 0);
}

export default function MealPlan() {
    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMeals();
    }, []);

    async function fetchMeals() {
        setLoading(true);
        try {
            const response = await fetch("/api/meals");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            //Fetch full details for each meal
            const mealPlanDetails = {};
            for (const [day, meals] of Object.entries(data.mealPlan)) {
                mealPlanDetails[day] = await Promise.all(
                    meals.map(async (recipeName) => {
                        if (recipeName === "No meal available") return "No meal available";
                        const mealDetails = await fetchRecipeDetails(recipeName);
                        return mealDetails || { strMeal: recipeName, strInstructions: "No details available." };
                    })
                );
            }

            setMealPlan(mealPlanDetails);
        } catch (error) {
            console.error("Error fetching meals:", error);
            setError("Failed to load meal plan.");
        } finally {
            setLoading(false);
        }
    }

    async function regenerateMealPlan() {
        setLoading(true);
        try {
            const response = await fetch("/api/meals", { method: "POST" });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            //Fetch full details again
            const enrichedMealPlan = {};
            for (const [day, meals] of Object.entries(data.mealPlan)) {
                enrichedMealPlan[day] = await Promise.all(
                    meals.map(async (recipeName) => {
                        if (recipeName === "No meal available") return "No meal available";
                        const mealDetails = await fetchRecipeDetails(recipeName);
                        return mealDetails || { strMeal: recipeName, strInstructions: "No details available." };
                    })
                );
            }

            setMealPlan(enrichedMealPlan);
        } catch (error) {
            console.error("Error regenerating meal plan:", error);
            setError("Failed to regenerate meal plan.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
        <Header/>
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
           
            <h1 className="text-3xl font-bold mb-4 text-gray-600">Weekly Meal Plan</h1>

            {error && <p className="text-red-500">{error}</p>}

            {/*Button stays visible */}
            <button
                onClick={regenerateMealPlan}
                className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
                {loading ? "Regenerating..." : "Regenerate Meal Plan"}
            </button>

            {loading ? (
                <p>Loading meal plan...</p>
            ) : mealPlan ? (
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                    {Object.entries(mealPlan).map(([day, meals], index) => (
                        <div key={index} className="mb-8 border-b pb-4">
                            <h2 className="text-2xl font-semibold text-gray-700">{day}</h2>

                            {/* Display Breakfast */}
                            {meals[0] !== "No meal available" && meals[0] ? (
                                <div className="mt-4 text-gray-600">
                                    <h3 className="text-xl font-semibold">Breakfast: {meals[0].strMeal}</h3>
                                    {meals[0].strMealThumb && (
                                        <img src={meals[0].strMealThumb} alt={meals[0].strMeal} className="w-full h-40 object-cover rounded-md mt-2" />
                                    )}
                                    <h4 className="font-semibold mt-2">Instructions:</h4>
                                    <ol className="list-decimal list-inside">
                                        {formatInstructions(meals[0].strInstructions).map((step, i) => (
                                            <li key={i}>{step}.</li>
                                        ))}
                                    </ol>
                                    <h4 className="font-semibold mt-2">Ingredients:</h4>
                                    <ul className="list-disc list-inside">
                                        {Object.keys(meals[0])
                                            .filter(key => key.startsWith("strIngredient") && meals[0][key])
                                            .map((key, i) => (
                                                <li key={i}>{meals[1][key]}</li>
                                            ))}
                                    </ul>
                                    
                                </div>
                            ) : (
                                <p className="text-gray-600 mt-4"><strong>Breakfast:</strong> No meal available</p>
                            )}

                            {/* Display Dinner */}
                            {meals[1] !== "No meal available" && meals[1] ? (
                                <div className="mt-4 text-gray-600">
                                    <h3 className="text-xl font-semibold">Dinner: {meals[1].strMeal}</h3>
                                    {meals[1].strMealThumb && (
                                        <img src={meals[1].strMealThumb} alt={meals[1].strMeal} className="w-full h-40 object-cover rounded-md mt-2" />
                                    )}
                                    <h4 className="font-semibold mt-2">Instructions:</h4>
                                    <ol className="list-decimal list-inside">
                                        {formatInstructions(meals[1].strInstructions).map((step, i) => (
                                            <li key={i}>{step}.</li>
                                        ))}
                                    </ol>
                                    <h4 className="font-semibold mt-2">Ingredients:</h4>
                                    <ul className="list-disc list-inside">
                                        {Object.keys(meals[1])
                                            .filter(key => key.startsWith("strIngredient") && meals[1][key])
                                            .map((key, i) => (
                                                <li key={i}>{meals[1][key]}</li>
                                            ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-gray-600 mt-4"><strong>Dinner:</strong> No meal available</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No meal plan available.</p>
            )}
        </div>
        </div>
    );
}
