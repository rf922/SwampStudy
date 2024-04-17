import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Login } from "./../login/Login";
import { Matching } from "./../matching/Matching";
import { Forum } from "./../forum/Forum";
import Loading from "../loading/Loading";

const Home = () => {
  const [_userFirstName, setUserFirstName] = useState("");
  const { isLoggedIn, isLoading } = useAuth();
  const [view, setView] = useState("forum");

  useEffect(() => {
    //effect to set a custom welcome message,
    const getUserDetails = async () => {
      try {
        if (isLoggedIn) {
          const userDetailsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/account/details`,
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
  if (isLoading) {
    return (
      <div className="flex bg-purple-200 min-h-screen justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex divide-x-4 divide-sfsuPurple justify-between items-center bg-purple-200 p-2">
        <button
          className={`w-1/2 px-8 text-center text-lg ${view === "matching" ? "text-sfsuPurple font-extrabold underline underline-offset-1" : "text-sfsuPurple font-bold "}`}
          onClick={() => setView("matching")}
        >
          {view === "matching" ? "In Matching" : "Matching"}
        </button>

        {/* forum*/}
        <button
          className={`w-1/2 px-8 text-center text-lg ${view === "forum" ? "text-sfsuPurple font-extrabold underline underline-offset-1" : "text-sfsuPurple font-bold"}`}
          onClick={() => setView("forum")}
        >
          {view === "forum" ? "In Forums!" : "Forums"}
        </button>
      </div>

      <div className="flex-grow min-w-80 overflow-auto bg-purple-100 p-4">
        {view === "forum" ? <Forum /> : <Matching />}
      </div>
    </div>
  );
};

export default Home;
