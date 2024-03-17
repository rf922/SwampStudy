import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, isLoading, handleLogout } = useAuth();

  if (isLoading) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {!isLoggedIn ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/account">Account</Link>
        </>
      )}

      <Link to="/about">About</Link>
      <Link to="/forum">Forum</Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Navbar;
