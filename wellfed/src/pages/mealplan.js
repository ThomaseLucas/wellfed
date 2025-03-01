"use client"; // Required for `useEffect` in Next.js App Router

import { useState, useEffect } from "react";
import "../app/globals.css";
import Header from "./header";

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
                setMealPlan(data.mealPlan);
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
        <div>
            <Header />
        <div className="min-h-screen flex flex-col items-center bg-black-100 p-6">
            <h1 className="text-3xl font-bold mb-4">Weekly Meal Plan</h1>
            {error && <p className="text-red-500">{error}</p>}

            {loading ? (
                <p>Loading meal plan...</p>
            ) : mealPlan ? (
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                    {Object.entries(mealPlan).map(([day, meals], index) => (
                        <div key={index} className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">{day}</h2>
                            <p className="text-gray-600">
                                <strong>Breakfast:</strong> {meals[0] || "No meal available"}
                            </p>
                            <p className="text-gray-600">
                                <strong>Dinner:</strong> {meals[1] || "No meal available"}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No meal plan available.</p>
            )}

            {/*Regenerate Button */}
            <button
                onClick={regenerateMealPlan}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
                Regenerate Meal Plan
            </button>
        </div>
        </div>
    );
}
