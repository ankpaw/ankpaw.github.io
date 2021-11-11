import React from "react";
const Footer = (): JSX.Element => {
  return (
    <footer className="footer bg-white relative pt-1 border-b-2 border-black">
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 justify-center py-6 flex">
            <a className="m-1" href="https://github.com/ankpaw">
              <img alt="github logo" src="/icons/github.png"></img>
            </a>
            <a
              className="m-1"
              href="https://www.linkedin.com/in/iamankitpawar/"
            >
              <img alt="linkedin logo" src="/icons/linkedin-logo.png"></img>
            </a>
            <a className="m-1" href="https://twitter.com/ap9064">
              <img alt="twitter logo" src="/icons/twitter-sign.png"></img>
            </a>
          </div>
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-black font-bold mb-2">
              © {new Date().getFullYear()} | @ankpaw 🧑🏻‍💻
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
