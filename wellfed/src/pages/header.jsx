import Link from "next/link";
import React from "react";
import Header from "./header";

const header = () => {
  return (
    <div cl ssName="header">
      <h1>Next Starter Project</h1>
      <nav>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/about"}>About</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"/"}>Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default header;