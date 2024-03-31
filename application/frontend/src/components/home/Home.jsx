import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Login } from "./../login/Login";
const Home = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    //effect to set a custom welcome message,
    const getUserDetails = async () => {
      try {
        if (isLoggedIn) {
          const userDetailsResponse = await axios.get(
            "http://localhost:8080/api/account/details", // The following lines were for dev. /debug will be removed
            //"http://localhost:8080/api/forum/departments/dev",
            //            "http://localhost:8080/api/forum/departments/listing",
            { withCredentials: true },
          );
          console.log(userDetailsResponse);
          setUserFirstName(userDetailsResponse.data.first_name);
        } else {
          setUserFirstName("please log in.");
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    getUserDetails();
  }, [isLoggedIn]);

  //loading place holder, may replace with custom spinner / effect
  if (isLoading)
    return (
      <div>
        <h1>Swamp Study</h1>
        {<p>Content Loading . . . </p>}
      </div>
    );

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div>
      <div>
        <h1>Study Swamp</h1>
        {userFirstName && <p>Welcome, {userFirstName}!</p>}
      </div>
    </div>
  );
};

export default Home;
