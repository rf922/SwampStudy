import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Loading from "../components/loading/Loading";

const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/checkSession`, {
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
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/logout`,
        {},
        { withCredentials: true },
      );
      //      localStorage.removeItem("userDetails"); // rm specific item
      localStorage.clear(); //rm all of it
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isLoading, handleLogout }}
    >
      {!isLoading ? (
        children
      ) : (
        <div className="flex bg-purple-200 min-h-screen justify-center items-center">
          <Loading />
        </div>
      )}
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
