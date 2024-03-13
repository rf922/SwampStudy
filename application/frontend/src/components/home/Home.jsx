import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [userFirstName, setUserFirstName] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const loginStatusResponse = await axios.get(
          "http://localhost:8080/api/user/loginStatus",
          { withCredentials: true },
        );

        if (loginStatusResponse.data.isLoggedIn) {
          const userDetailsResponse = await axios.get(
            "http://localhost:8080/api/account/details",
            { withCredentials: true },
          );
          console.log(userDetailsResponse.data);
          setUserFirstName(userDetailsResponse.data.first_name);
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      <h1>Study Swamp</h1>
      {userFirstName && <p>Welcome, {userFirstName}!</p>}
    </div>
  );
};

export default Home;
