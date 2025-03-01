"use client"; // Required for `useEffect` in Next.js App Router

import { useState, useEffect } from "react";
import "../app/globals.css";

async function fetchRecipeDetails(recipeName){
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(recipeName)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
}

export default function MealPlan() {
    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    // Fetch meal plan when the page loads
    useEffect(() => {
        async function fetchMeals() {
            try {
                const response = await fetch("/api/meals");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                
                const data = await response.json();

                const mealPlanDetails = {};
                for (const [day, meals] of Object.entries(data.mealPlan)) {
                    mealPlanDetails[day] = await Promise.all(
                        meals.map(async (recipeName) => {
                            if (recipeName == "No meal available") return "No meal available";
                            const mealDetails = await fetchRecipeDetails(recipeName);
                            return mealDetails || {string: recipeName, strInstructions: "No details available"};
                        })
                    )
                }
                setMealPlan(mealPlanDetails);
            } catch (error) {
                console.error("Error fetching meals:", error);
                setError("Failed to load meal plan.");
            } finally {
                setLoading(false);
            }
        }

        fetchMeals();
    }, []);

    // Function to regenerate the meal plan on button click
    async function regenerateMealPlan() {
        setLoading(true);
        try {
            const response = await fetch("/api/meals", { method: "POST" });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            setMealPlan(data.mealPlan);
        } catch (error) {
            console.error("Error regenerating meal plan:", error);
            setError("Failed to regenerate meal plan.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-600">Weekly Meal Plan</h1>
            {error && <p className="text-red-500">{error}</p>}

            {/* Keep button visible even when loading */}
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
                            {meals[0] !== "No meal available" ? (
                                <div className="mt-4 text-gray-600">
                                    <h3 className="text-xl font-semibold">Breakfast: {meals[0].strMeal}</h3>
                                    <img src={meals[0].strMealThumb} alt={meals[0].strMeal} className="w-full h-40 object-cover rounded-md mt-2" />
                                    <p className="mt-2"><strong>Instructions:</strong></p>
                                    <ol className="list-decimal list-inside">
                                        {meals[0].strInstructions.split('. ').map((sentence, i) => (
                                            <li key={i}>{sentence}</li>
                                        ))}
                                    </ol>
                                    <h4 className="font-semibold mt-2">Ingredients:</h4>
                                    <ul className="list-disc list-inside">
                                        {Object.keys(meals[0])
                                            .filter(key => key.startsWith("strIngredient") && meals[0][key])
                                            .map((key, i) => (
                                                <li key={i}>{meals[0][key]}</li>
                                            ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-gray-600 mt-4"><strong>Breakfast:</strong> No meal available</p>
                            )}

                            {/* Display Dinner */}
                            {meals[1] !== "No meal available" ? (
                                <div className="mt-4 text-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-600">Dinner: {meals[1].strMeal}</h3>
                                    <img src={meals[1].strMealThumb} alt={meals[1].strMeal} className="w-full h-40 object-cover rounded-md mt-2" />
                                    <p className="mt-2"><strong>Instructions:</strong></p>
                                    <ol className="list-decimal list-inside">
                                        {meals[1].strInstructions.split('. ').map((sentence, i) => (
                                            <li key={i}>{sentence}</li>
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
    );
}
