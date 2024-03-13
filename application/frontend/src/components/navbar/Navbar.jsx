import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/loginStatus",
          { withCredentials: true },
        );
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Failed to check login status", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/user/logout",
        {},
        { withCredentials: true },
      );
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {!isLoggedIn && <Link to="/register">Register</Link>}
      {!isLoggedIn ? (
        <Link to="/login">Login</Link>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;
