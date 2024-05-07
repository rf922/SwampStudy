import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "./../loading/Loading";

const Navbar = () => {
  const { isLoggedIn, isLoading, handleLogout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex bg-purple-200 justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-50  bg-purple-700 text-white py-3 flex flex-wrap justify-center items-center gap-4">
      <Link
        to="/about"
        className="bg-yellow-300 rounded-full px-5 py-1 text-black hover:bg-yellow-400 transition-colors duration-300"
      >
        About
      </Link>

      <Link to="/" className="flex items-center">
        <div className="flex items-center">
          <img
            src="/images/swampstudy.png"
            alt="Swamp Study"
            className="mx-1 w-17 h-9"
          />
        </div>
      </Link>

      <Link to="/" className="flex items-center">
        <img src="/images/alli.png" alt="Logo" className="ml-2 w-17 h-9" />
      </Link>
      {isLoggedIn && (
        <>
          <Link
            to="/settings"
            className="bg-yellow-300 rounded-full px-5 py-1 text-black hover:bg-yellow-400 transition-colors duration-300"
          >
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="bg-yellow-300 rounded-full px-5 py-1 text-black hover:bg-yellow-400 transition-colors duration-300"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
