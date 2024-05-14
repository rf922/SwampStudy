import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserDetails } from "../../context/UserContext"; // Import useUserDetails hook
import { Login } from "./../login/Login";
import { Matching } from "./../matching/Matching";
import { Forum } from "./../forum/Forum";
import Loading from "../loading/Loading";

const Home = () => {
  const { userDetails } = useUserDetails(); // Destructure userDetails from context
  const { isLoggedIn, isLoading } = useAuth();
  const [view, setView] = useState(localStorage.getItem("view") || "matching");

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

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

  const isIntrovert = userDetails?.introvert || false;
  const isHidden = userDetails?.isHidden || false;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex divide-x-4 divide-sfsuPurple justify-between items-center bg-purple-200 p-2">
        <button
          className={`w-1/2 px-8 text-center text-lg ${view === "matching" ? "text-sfsuPurple bg-purple-400 font-extrabold underline underline-offset-1" : "text-sfsuPurple font-bold"}`}
          onClick={() => setView("matching")}
        >
          {view === "matching" ? "In Matching" : "Matching"}
        </button>

        <button
          className={`w-1/2 px-8 text-center text-lg ${view === "forum" ? "text-sfsuPurple bg-purple-400 font-extrabold underline underline-offset-1" : "text-sfsuPurple font-bold"}`}
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
