import React from "react";
import SocialIcon from "../socialicon/Socialicon";

const Footer = () => {
  return (
    <footer className="bg-purple-200 shadow w-full">
      <div className="max-w-screen-xl mx-auto py-2 md:py-4">
        <div className="flex justify-between items-start">
          {" "}
          <div>
            <a href="/" className="flex items-center space-x-2 mb-2">
              {" "}
              <img
                src="./images/alli.png"
                className="h-6"
                alt="Swamp Study Logo"
              />
              <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-black">
                SwampStudy
              </span>
            </a>
            <ul className="flex items-center text-xs font-medium dark:text-black">
              <li>
                <a href="/about" className="hover:underline mr-2 md:mr-3">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/privacypolicy"
                  className="hover:underline mr-2 md:mr-3"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/licensing" className="hover:underline mr-2 md:mr-3">
                  Licensing
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-sm mr-2">follow us!</span>
            <SocialIcon size="small" />
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-black text-center mt-2">
          © 2024 SwampStudy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
