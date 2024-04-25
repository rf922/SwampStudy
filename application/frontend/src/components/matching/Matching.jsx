import React, { useState } from "react";
import MatchingCard from "./MatchingCard";
import DisplayMeetingDetails from "./DisplayMeetingDetails";
import users from "./users";
import matches from "./matches";

export const Matching = () => {
  const [selectedMatch, setSelectedMatch] = useState(users.beverly); // track sel match
  const userKeys = Object.keys(users);
  const [user, setUser] = useState(users.kimberly);
  const [userIndex, setUserIndex] = useState(0);
  const [view, setView] = useState("");
  const [usrMatches, setUsrMatches] = useState([]);
  const [usrPastMatches, _setUsrPastMatches] = useState([users.beverly]);
  const [animationClass, setAnimationClass] = useState("");

  const handleLeftClick = () => {
    setAnimationClass("animate-slide-out-left"); // left slide
    setTimeout(() => {
      setUserIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % userKeys.length;
        const currentUser = users[userKeys[newIndex]];
        setUser(currentUser);
        setAnimationClass(""); // reset each time
        return newIndex;
      });
    }, 500); // change duration here
  };

  const handleRightClick = () => {
    if (
      ["Helen", "Kimberly", "Klara"].includes(user.first_name) &&
      !usrMatches.some((match) => match.id === user.id)
    ) {
      setUsrMatches((prevMatches) => [...prevMatches, user]);
    }
    setAnimationClass("animate-slide-out-right"); //  right slide-out animation
    setTimeout(() => {
      setUserIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % userKeys.length;
        const currentUser = users[userKeys[newIndex]];
        setUser(currentUser);
        setAnimationClass(""); // reset
        return newIndex;
      });
    }, 500); 
  };

  const handleMatchClick = (user) => {
    console.log(`Match ${user.first_name} clicked`);
    setView("matchDetails");
    setSelectedMatch(user); // set sel match to the one clicked
  };

  const handleBackToMatchingClick = () => {
    setView("matching");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center my-4">
      <div
        className={`w-full md:w-4/5 max-w-4xl rounded-lg shadow-lg bg-gray-100 border border-purple-200 transition-all duration-500 ${animationClass}`}
      >
        <div className="bg-violet-200 text-gray-800 py-4 px-6">
          <h1 className="font-bold text-lg text-purple-800">
            {view === "matchDetails"
              ? "Match Details"
              : "Find Someone To Study With!"}
          </h1>
        </div>
        {selectedMatch && view === "matchDetails" ? (
          <DisplayMeetingDetails user={selectedMatch} />
        ) : (
          <div className="flex flex-row">
            <div
              className="flex flex-col justify-center items-center hover:bg-red-100 hover:text-white w-fit cursor-pointer"
              onClick={handleLeftClick}
            >
              <button className="bg-transparent text-purple-700 font-semibold py-2 w-full flex justify-center items-center">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="red"
                  className="w-8 h-8 mx-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="my-12 flex-grow">
              <MatchingCard user={user} />
            </div>
            <div
              className="flex flex-col justify-center items-center w-fit hover:bg-green-100 hover:text-white cursor-pointer"
              onClick={handleRightClick}
            >
              <button className="bg-transparent w-full text-purple-700 font-semibold py-2 flex justify-center items-center">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="green"
                  className="w-8 h-8 mx-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/5 rounded-lg shadow-lg bg-gray-100 border border-purple-200">
        <div className="bg-violet-200 border border-violet-200 text-gray-800 py-4 px-6">
          <h1 className="font-bold text-lg text-purple-800">Your Matches!</h1>
        </div>
        {view === "matchDetails" && (
          <button
            className="w-full text-left py-2 px-4 border border-fuchsia-200 hover:bg-purple-100 text-gray-800"
            onClick={handleBackToMatchingClick}
          >
            <span className="text-purple-700">Match With More Users!</span>
          </button>
        )}
        <div className="overflow-auto scrollbar-hide min-h-52 max-h-[220px] border border-violet-200 text-gray-800">
          <h1 className="font-bold text-lg text-purple-800">Latest matches</h1>
          {Object.entries(usrMatches).map(([key, user], index) => (
            <button
              key={index}
              className={`w-full text-left py-2 px-4 border border-fuchsia-200 ${
                key === selectedMatch
                  ? "bg-purple-100 border-purple-700 border-l-4"
                  : ""
              } hover:bg-purple-100 text-gray-800`}
              onClick={() => handleMatchClick(user)}
            >
              You Matched with{" "}
              <span className="text-purple-700">{user.first_name}</span>!
            </button>
          ))}
        </div>
        <div className="border border-violet-200 overflow-auto text-gray-800 py-4 px-6">
          <h1 className="font-bold text-lg text-purple-800">
            Your previous matches
          </h1>
          {Object.entries(usrPastMatches).map(([key, user], index) => (
            <button
              key={index}
              className={`w-full text-left py-2 px-4 border border-fuchsia-200 ${
                key === selectedMatch
                  ? "bg-purple-100 border-purple-700 border-l-4"
                  : ""
              } hover:bg-purple-100 text-gray-800`}
              onClick={() => handleMatchClick(user)}
            >
              You Matched with{" "}
              <span className="text-purple-700">{user.first_name}</span>!
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matching;
