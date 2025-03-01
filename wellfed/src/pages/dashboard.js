import '../app/globals.css';
import Link from 'next/link'
import Header from "./header";


export default function Dashboard() {
    return (
        <div className="bg-gray-100">
            <Header />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/12 text-lg"
            >
                <Link href="/" scroll={false}>Home
                </Link>

            </button>

            <div className="min-h-screen flex items-center justify-center">
                
                    <button
                    type="button"

                    onClick={() => window.location.href = '/recipeswiper'}  // Redirect to the signup page
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-30 w-50 m-10 text-2xl">Recipe
                    </button>
                    
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-30 w-50 m-10 text-2xl">
                        <Link href="/mealplan" scroll={false}>Generate</Link>
                    </button>   
            </div>
        </div>
    );
}