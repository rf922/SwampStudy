import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
const AuthContext = createContext(null);

export const Auth = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/checkSession",
          {
            withCredentials: true,
          },
        );
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Failed to check login status", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    console.log("Attempting to logout...");
    try {
      await axios.post(
        "http://localhost:8080/api/user/logout",
        {},
        { withCredentials: true },
      );
      setIsLoggedIn(false);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isLoading, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
