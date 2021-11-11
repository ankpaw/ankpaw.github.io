import React from "react";
/* This is the about page
 * @return {JSX.Element}: The JSX code for about page.
 */
const About = () => {
  return (
    <div className="container mx-auto px-16">
      <h1 className="text-5xl">About Me</h1>
      <p className="max-w-2xl text-gray-500 mt-4">
        Hello! My name is Ankit. I have always had a knack for problem solving,
        and been fascinated by computers since I saw them for the first time.
        Software development combines the two for me and that is why I love it
        so much. I enjoy the work I do, and love to solve complex problems and
        build stuff from grounds up. I started my journey in 2017, when I got to
        know about competitive programming and got chosen to be a campus
        ambassador by{" "}
        <a className="text-blue-400" href="https://www.hackerearth.com/">
          HackerEarth
        </a>
        . Since then, I have only grown and become better by every
        experience/oppurtunity I got. I have got the oppurtunity to work in
        variety of different environments like for small startups as well as
        Fortune 500 companies, with/without technology stack restrictions,
        huge/small development teams. My main focus these days is to learn more
        new stuff and use it to add value to the world we live in.
      </p>
      <div className="text-gray-500 mt-4">
        <p>Here are a few technologies I have worked with:</p>
        <div className="mt-4 flex">
          <ul className="text-black list-square px-16">
            <li>ReactJS</li>
            <li>NextJS</li>
            <li>AngularJS</li>
            <li>Angular2+</li>
            <li>ASP .NET C#</li>
          </ul>
          <ul className="text-black list-square">
            <li>JQuery</li>
            <li>Javascript (ES6)</li>
            <li>Node.JS</li>
            <li>Svelte</li>
            <li>Microsoft Azure</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default About;
