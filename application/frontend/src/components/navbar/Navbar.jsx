import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // add loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/loginStatus",
          { withCredentials: true },
        );
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Failed to verify auth status", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false); //  loading  false after checking auth status
      }
    };

    checkAuthStatus();
  }, [setIsLoggedIn]);

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

  if (isLoading) return null;

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
