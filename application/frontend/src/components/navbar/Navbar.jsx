import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/user/logout",
        {},
        { withCredentials: true },
      );
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {!isLoggedIn ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <Link to="/about">About</Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Navbar;
