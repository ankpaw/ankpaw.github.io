import React from "react";
/* This is the homepage
 * @return {JSX.Element}: The JSX code for homepage.
 */
const Home = () => {
  return (
    <div className="container mx-auto px-16">
      <p className="text-gray-700">Hello, my name is </p>
      <h1 className="text-8xl">Ankit Pawar.</h1>
      <h2 className="mt-2 text-5xl text-gray-300">
        I build things for the web.
      </h2>
      <p className="mt-2 text-gray-500 max-w-xl py-4">
        I&apos;m a self-taught software developer who loves to write clean,
        reusable and optimised code . Web development is my forte. I have
        experience in both Open Source and Microsoft stack for development of
        scalable, responsive web applications. Currently helping build{" "}
        <a
          href="https://hub.com"
          target="_blank"
          className="text-blue-400"
          rel="noreferrer"
        >
          Hub - reinventing the financial services operating model.
        </a>
      </p>

      <button className="bg-black text-white border-black p-2 mt-8 border rounded hover:bg-gray-500">
        <a href="mailto:iamankitpawar@gmail.com">Get In Touch</a>
      </button>
    </div>
  );
};
export default Home;
