import React from "react";
import SocialIcon from "../socialicon/Socialicon";
const Footer = () => {
  return (
    <footer className="bg-transparent shadow mx-4 my-0">
      <div className="w-full max-w-screen-xl mx-auto py-4 md:py-8 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <a
            href="https://swamp-study.global.ssl.fastly.net/"
            className="flex items-center space-x-3"
          >
            <img
              src="./images/alli.png"
              className="h-8"
              alt="Swamp Study Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              SwampStudy
            </span>
          </a>
          <ul className="flex flex-wrap items-center text-sm font-medium dark:text-black">
            <li>
              <a href="/about" className="hover:underline mr-4 md:mr-6">
                About
              </a>
            </li>
            <li>
              <a href="/privacypolicy" className="hover:underline mr-4 md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/licensing" className="hover:underline mr-4 md:mr-6">
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
        <div className="flex justify-center items-center w-full">
          <span className="mr-2">follow us!</span>
          <SocialIcon />
        </div>
      </div>
      <hr className="my-4 border-gray-200" />
      <div className="flex flex-col items-center justify-end pt-4">
        <span className="text-sm text-gray-500 dark:text-black">
          © 2024{" "}
          <a
            href="https://swamp-study.global.ssl.fastly.net/"
            className="hover:underline"
          >
            SwampStudy
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
