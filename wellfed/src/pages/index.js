import Image from "next/image";
import Head from 'next/head';
import { useState } from 'react';
import '../app/globals.css';
import Header from "./header.jsx";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState(''); // State for displaying messages

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md h-96 flex flex-col gap-10 "> 
      <Link 
          className="h-full w-full bg-blue-600 text-white text-[42px] py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          href={"/login"}>
          <button
            name="button"
            value="login"
            type="button"
            className="h-full w-full bg-blue-600 text-white text-[42px] py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
        
          Login

          </button>
          </Link>

          
          <Link href={"/signup"} className="h-full w-full bg-blue-600 text-white py-2 px-4 text-[42px] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">

          <button
  name="button"
  value="signup"
  type="button"
  className="h-full w-full bg-blue-600 text-white py-2 px-4 text-[42px] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
Sign Up

</button>
</Link>

        



        {message && (
          <p
            id="message"
            className={`mt-4 text-center ${
              message.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}