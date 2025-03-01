import Link from "next/link";
import React from "react";
import Header from "./header";

const header = () => {
  return (
    <div cl ssName="bg-gray-100">
      <nav>
        <ul>
            <button className="inline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-lg w-1/4">
            <Link href={"/dashboard"}>Home</Link>
            </button>
            <button className="inline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-lg w-1/4">
              <Link href={"/mealplan"}>Meal Plan</Link>
            </button>
            <button className="inline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-lg w-1/4">
              <Link href={"/contact"}>Contact</Link>
            </button>
            <button className="inline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-lg w-1/4">
              <Link href={"/"}>Signout</Link>
            </button>

        </ul>
      </nav>
    </div>
  );
};

export default header;