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
      <div className="flex justify-between items-center bg-purple-200 p-3">
        <button
          className={`w-1/2 text-left " ${view === "matching" ? "bg-purple-400" : "text-purple-400 font-bold"}`}
          onClick={() => setView("matching")}
        >
          {view === "matching" ? "Currently in Matching!" : "Go To Matching"}
        </button>

        {/* forum*/}
        <button
          className={`w-1/2 text-right ${view === "forum" ? "bg-purple-400" : "text-purple-400 font-bold"}`}
          onClick={() => setView("forum")}
        >
          {view === "forum" ? "Currently in Forums!" : "Go To Forums"}
        </button>
      </div>

      <div className="flex-grow  overflow-auto bg-purple-100 p-4">
        {view === "forum" ? <Forum /> : <Matching />}
      </div>
    </div>
  );
};

export default Home;
