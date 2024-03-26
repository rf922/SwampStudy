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
          <Link to="/about">About</Link>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/account">Account</Link>
        </>
      )}

      <Link to="/" className="text-x1 font-bold flex items-center">
        <span> Swamp Study</span>
      </Link>

      <Link to="/forum" className="flex items-center">
        <span>
          <img src="/images/alli.png" className="ml-2 w-17 h-9" />
        </span>
      </Link>

      <Link to="/settings">Settings</Link>
      <Link to="/logout">Logout</Link>

      {/*
            <Link to="/matching">Matching</Link>
                  <Link to="/forum">Forum</Link>

            

      */}
    </div>
  );
};

export default Navbar;
