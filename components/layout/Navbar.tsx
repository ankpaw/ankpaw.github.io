import React from "react";
import Image from "next/image";
import router from "next/router";
const Navbar = (): JSX.Element => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6">
      <div
        className="flex items-center flex-shrink-0 text-black mr-6 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          alt="Ankit Pawar Logo"
          src="/favicon-32x32.png"
          height="32"
          width="32"
        />
        <span className="ml-4 font-semibold text-xl tracking-tight">
          Ankit Pawar
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded border-black hover:border-black">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-400 mr-4"
          >
            About
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-400 mr-4"
          >
            Experience
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-400 mr-4"
          >
            Blog
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-blue-400"
          >
            Contact
          </a>
        </div>
        <div>
          <a
            href="/Ankit-Pawar.pdf"
            target="_blank"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-blue-400 hover:text-blue-400 mt-4 lg:mt-0"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
