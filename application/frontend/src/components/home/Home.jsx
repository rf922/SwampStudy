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
  const [view, setView] = useState(localStorage.getItem("view") || "matching");
  const [isIntrovert, setIsIntrovert] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // effect for setting userDetails in local storage
    const getUserDetails = async () => {
      try {
        const localData = localStorage.getItem("userDetails");
        if (localData && isLoggedIn) {
          // if it exits and usr logged in
          //ex using it to set fields may remov later
          const userData = JSON.parse(localData);
          setUserFirstName(userData.first_name);
          setIsIntrovert(userData.introvert);
          setIsHidden(userData.isHidden);
          console.log(localData);
        } else if (isLoggedIn) {
          // logged in try to get the acc detials
          const userDetailsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/account/details`,
            { withCredentials: true },
          );
          console.log(userDetailsResponse);
          if (userDetailsResponse.data.profile_picture) {
            // prof pic set, fix url (maybe fix before sending ?)
            userDetailsResponse.data.profile_picture =
              userDetailsResponse.data.profile_picture.replace(/\+{10}$/, "");
          }

          localStorage.setItem(
            //set the use detail obj,
            "userDetails",
            JSON.stringify(userDetailsResponse.data),
          );
          setUserFirstName(userDetailsResponse.data.first_name);
          setIsIntrovert(userDetailsResponse.data.introvert);
          setIsHidden(userDetailsResponse.isHidden);
        } else {
          setUserFirstName("please log in.");
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    getUserDetails();
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("view", view);
    //console.log(localStorage.getItem("view"));
  }, [view]);

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
          className={`w-1/2 px-8 text-center text-lg ${view === "matching" ? "text-sfsuPurple bg-purple-400 font-extrabold underline underline-offset-1" : "text-sfsuPurple font-bold "}`}
          onClick={() => setView("matching")}
        >
          {view === "matching" ? "In Matching" : "Matching"}
        </button>

        {/* forum*/}
        <button
          className={`w-1/2 px-8 text-center text-lg ${view === "forum" ? "text-sfsuPurple bg-purple-400  font-extrabold underline underline-offset-1" : "text-sfsuPurple font-bold"}`}
          onClick={() => setView("forum")}
        >
          {view === "forum" ? "In Forums!" : "Forums"}
        </button>
      </div>

      <div className="flex-grow min-w-80 overflow-auto bg-purple-100 p-4">
        {view === "forum" ? (
          <Forum />
        ) : (
          <Matching isIntrovert={isIntrovert} isHidden={isHidden} />
        )}
      </div>
    </div>
  );
};

export default Home;
