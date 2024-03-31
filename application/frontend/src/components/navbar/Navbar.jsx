import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, isLoading, handleLogout } = useAuth();

  if (isLoading) return null;

  return (
    <div className="sticky top-0 bg-purple-600 text-white p-4 flex flex-wrap justify-center items-center gap-4">
      {!isLoggedIn ? (
        <>
          <Link
            to="/about"
            className="mr-4"
            style={{
              backgroundColor: "yellow",
              borderRadius: "20px",
              padding: "5px 10px",
              display: "inline-block",
              color: "black",
            }}
          >
            About
          </Link>

          <Link
            to="/login"
            className="text-x1 font-bold flex items-center"
            style={{ fontSize: "1.25rem", color: "yellow" }}
          >
            <span> Swamp Study</span>
          </Link>

          <Link to="/login" className="flex items-center">
            <span>
              <img src="/images/alli.png" className="ml-2 w-17 h-9" />
            </span>
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/about"
            className="mr-4"
            style={{
              backgroundColor: "yellow",
              borderRadius: "20px",
              padding: "5px 10px",
              display: "inline-block",
              color: "black",
            }}
          >
            About
          </Link>

          <Link
            to="/"
            className="text-x1 font-bold flex items-center"
            style={{ fontSize: "1.25rem", color: "yellow" }}
          >
            <span> Swamp Study</span>
          </Link>

          <Link to="/forum" className="flex items-center">
            <span>
              <img src="/images/alli.png" className="ml-2 w-17 h-9" />
            </span>
          </Link>

          <Link
            to="/account"
            className="mr-4"
            style={{
              backgroundColor: "yellow",
              borderRadius: "20px",
              padding: "5px 10px",
              display: "inline-block",
              color: "black",
            }}
          >
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="mr-4"
            style={{
              backgroundColor: "yellow",
              borderRadius: "20px",
              padding: "5px 10px",
              display: "inline-block",
              color: "black",
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
