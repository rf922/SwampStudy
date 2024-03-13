import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (isLoggedIn) {
          const userDetailsResponse = await axios.get(
            "http://localhost:8080/api/account/details",
            { withCredentials: true },
          );
          console.log(userDetailsResponse.data);
          setUserFirstName(userDetailsResponse.data.first_name);
        } else {
          setUserFirstName("Welcome, please log in.");
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    getUserDetails();
  }, [isLoggedIn]);

  return (
    <div>
      <h1>Study Swamp</h1>
      {userFirstName && <p>Welcome, {userFirstName}!</p>}
    </div>
  );
};

export default Home;
