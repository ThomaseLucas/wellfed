import { useState, useEffect } from 'react';
import '../app/globals.css';

export default function RecipeSwiper() {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        getRecipe();
    }, []);

    async function getRecipe() {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            const meal = data.meals[0];

            const newRecipe = {
                name: meal.strMeal,
                id: meal.idMeal,
                category: meal.strCategory,
                area: meal.strArea,
                image: meal.strMealThumb,
                video: meal.strYoutube,
                source: meal.strSource,
                instructions: meal.strInstructions,
                ingredients: [],
            };

            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]?.trim()) {
                    newRecipe.ingredients.push(`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`);
                }
            }

            setRecipe(newRecipe);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function swipeRight() {
        console.log("swiped right");
        getRecipe();
    }

    function swipeLeft() {
        console.log("swiped left");
    }

    return (
        <div className="flex w-full min-h-screen bg-red-100 justify-center items-center">
            <div className="bg-gray-100 w-100 h-175 flex flex-col items-center p-4 rounded-lg shadow-md">
                {recipe ? (
                    <div className="flex flex-col items-center w-full h-full">
                        <p className="font-semibold text-black text-center">{recipe.name}</p>
                        <img 
                            src={recipe.image} 
                            alt="Recipe" 
                            className="w-[200px] h-[200px] object-cover rounded-lg mt-2"
                        />
                        <p className="text-sm text-gray-500 mt-2">{recipe.category} | {recipe.area}</p>
                        
                        {/* Scrollable Ingredients List */}
                        <div className="w-full max-h overflow-y-auto mt-2 px-2">
                            <p className="text-sm font-semibold text-gray-700">Ingredients:</p>
                            <ul className="text-sm text-gray-600 list-disc pl-6">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Buttons at the Bottom */}
                        <div className="mt-auto flex gap-2">
                            <button
                                onClick={swipeLeft}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Swipe Left
                            </button>
                            <button
                                onClick={swipeRight}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Swipe Right
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
