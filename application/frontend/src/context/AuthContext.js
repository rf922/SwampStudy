import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
<<<<<<< HEAD
      .get("https://swamp-study.global.ssl.fastly.net/api/auth/checkSession", {
=======
      .get(`${process.env.REACT_APP_API_URL}/auth/checkSession`,{}, {
>>>>>>> development-forums-api
        withCredentials: true,
      })
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
      })
      .catch((error) => {
        console.error("Failed to check login status", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
<<<<<<< HEAD
      await axios.post(
        "https://swamp-study.global.ssl.fastly.net/api/user/logout",
        {},
        { withCredentials: true },
      );
=======
      await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`, {
        withCredentials: true,
      });
>>>>>>> development-forums-api
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isLoading, handleLogout }}
    >
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
