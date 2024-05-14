import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const { isLoggedIn } = useAuth(); 

  useEffect(() => {
    if (isLoggedIn) {
      // only get user details if the user is logged in
      const getUserDetails = async () => {
        try {
          const localData = localStorage.getItem("userDetails");
          if (localData) {
            setUserDetails(JSON.parse(localData));
          } else {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/account/details`,
              {
                withCredentials: true,
              },
            );
            localStorage.setItem("userDetails", JSON.stringify(response.data));
            setUserDetails(response.data);
          }
        } catch (error) {
          console.log("trouble setting userDetails");
        }
      };

      getUserDetails();
    } else {
      setUserDetails(null); // Clear userDetails if not logged in
    }
  }, [isLoggedIn]); // Depend on isLoggedIn

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserDetails = () => useContext(UserContext);
