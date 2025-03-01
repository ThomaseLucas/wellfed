import '../app/globals.css';
import Link from 'next/link'
import Header from "./header";


export default function Dashboard() {
    return (
        <div className="bg-gray-100">
            <Header />

            <div className="min-h-screen flex items-center justify-center">
                    <Link href="/recipeswiper" scroll={false}>
                    <button
                    type="button"

                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-30 w-50 m-10 text-2xl">Recipe
                    </button>
                    </Link>
                    
                    <Link href="/mealplan" scroll={false}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-30 w-50 m-10 text-2xl">
                        <Link href="/mealplan" scroll={false}>Generate</Link>
                    </button>   
                    </Link>
            </div>
        </div>
    );
}