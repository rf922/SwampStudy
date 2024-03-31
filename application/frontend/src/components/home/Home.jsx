import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Login } from "./../login/Login";
import { Matching } from "./../matching/Matching";
import { Forum } from "./../forum/Forum";

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
      <div className="flex justify-between items-center bg-purple-200 p-3">
        <button
          className={`flex-1 text-left " ${view === "matching" ? "bg-purple-400 font-bold" : "bg-purple-400"}`}
          onClick={() => setView(view === "matching" ? "forum" : "matching")}
        >
          {view === "matching" ? "Currently in Matching!" : "Go To Matching"}
        </button>
        <button
          className={`flex-1 text-right ${view === "forum" ? "text-purple-400 font-bold" : "bg-purple-400"}`}
          onClick={() => setView("forum")}
        >
          {view === "forum" ? "Currently in Forums!" : "Forums"}
        </button>
      </div>

      <div className="p-4 overflow-auto" style={{ maxHeight: "70vh" }}>
        {view === "forum" ? <Forum /> : <Matching />}
      </div>
    </div>
  );
};

export default Home;
