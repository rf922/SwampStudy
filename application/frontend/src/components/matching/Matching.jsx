import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MatchingCard from "./../matchingcard/MatchingCard";
import MeetingDetailsCard from "./../meetingdetailscard/MeetingDetailsCard";
import axios from "axios";
import useLikeAPI from "./hooks/useLikeAPI";
import useMatchAPI from "./hooks/useMatchAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Matching = ({ isIntrovert, isHidden }) => {
  const [view, setView] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileIndex, setProfileIndex] = useState(0);
  const [matchFound, setMatchFound] = useState(null);
  const [animationClass, setAnimationClass] = useState("");
  const { createLike } = useLikeAPI();
  const { matchList, pastMatches, selectedMatch, setSelectedMatch } =
    useMatchAPI(matchFound, pageNum);

  useEffect(() => {
    // notify the current state of isHidden
    if (isHidden) {
      toast.warning(
        "Your profile is hidden and will not be visible to other users ",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-red-500",
          progressClassName: "progress-bar-red",
        },
      );
    }
  }, [isHidden]);

  useEffect(() => {
    // notifythe current state of isHidden

    if (isIntrovert) {
      toast.info("introvert mode On, viewing other introverts.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isIntrovert]);

  useEffect(() => {
    const getUserProfiles = async () => {
      if (!pageNum) return;
      const url = `${process.env.REACT_APP_API_URL}/user/profiles/?page=${pageNum}&isIntrovert=${isIntrovert ? isIntrovert : false}`;
      try {
        const response = await axios.get(url, { withCredentials: true });
        const profiles = response.data;
        console.log(`Fetched ${profiles.length} profiles for page ${pageNum}`);
        if (profiles.length === 0) {
          console.log(
            `No profiles found for page ${pageNum}. Resetting to page 1.`,
          );
          setPageNum(1);
          setProfileIndex(0);
          return;
        }
        setUserProfiles(profiles);
      } catch (error) {
        console.error("Error getting profiles: ", error);
      }
    };
    getUserProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  useEffect(() => {
    setCurrentUser(userProfiles[profileIndex]);
  }, [userProfiles, profileIndex]);

  useEffect(() => {
    console.log(
      `Current profile index: ${profileIndex}, Total profiles: ${userProfiles.length}`,
    );
    if (userProfiles.length < 10) {
      if (profileIndex >= userProfiles.length) {
        setProfileIndex(0); //cycle from start
      }
      return;
    }
    if (profileIndex >= userProfiles.length) {
      console.log("Reached the last profile. Advancing to the next page.");
      setPageNum((prevPageNum) => {
        console.log(
          `Current page: ${prevPageNum}, Moving to page: ${prevPageNum + 1}`,
        );
        setProfileIndex(0);
        return prevPageNum + 1;
      });
    }
  }, [profileIndex, userProfiles]);

  const handleLeftClick = () => {
    console.log("Left button clicked. Sliding out left.");
    setAnimationClass("animate-slide-out-left");
    setTimeout(() => {
      setProfileIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        console.log(`Current index: ${prevIndex}, New index: ${newIndex}`);
        return newIndex;
      });
      setAnimationClass("");
    }, 500);
  };

  const handleRightClick = async () => {
    console.log("Right button clicked. Sliding out right.");
    setAnimationClass("animate-slide-out-right");
    const createdLike = await createLike(currentUser);

    setTimeout(() => {
      setProfileIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        console.log(`Current index: ${prevIndex}, New index: ${newIndex}`);
        return newIndex;
      });
      setAnimationClass("");
    }, 500);
    if (createdLike?.created) {
      console.log("Match was created: ", createdLike.match);
      toast.success("You just found a match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setMatchFound(createdLike.match);
    }
  };

  const handleMatchClick = (match) => {
    setView("matchDetails");
    setSelectedMatch(match);
  };

  const handleBackToMatchingClick = () => {
    setView("matching");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center my-2">
      <div
        className={`w-full md:w-4/5 max-w-4xl overflow-auto  rounded-lg shadow-lg bg-gray-100 border border-purple-200`}
      >
        <div className="bg-violet-200 text-gray-800 py-4 px-6">
          <h1 className="font-bold text-lg text-purple-800">
            {view === "matchDetails"
              ? "Match Details"
              : "Find Someone To Study With!"}
          </h1>
        </div>

        {selectedMatch && view === "matchDetails" ? (
          <MeetingDetailsCard match={selectedMatch} />
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
            {currentUser && (
              <div
                className={`my-12 flex-grow transition-all duration-500 ${animationClass}`}
              >
                <MatchingCard user={currentUser} />
              </div>
            )}

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
          {matchList.length > 0 &&
            matchList
              .sort(
                (match1, match2) =>
                  new Date(match2.date) - new Date(match1.date),
              )
              .map((match) => (
                <button
                  key={match.id}
                  className={`w-full text-left py-2 px-4 border border-fuchsia-200 ${
                    match.id === selectedMatch.id
                      ? "bg-purple-100 border-purple-700 border-l-4"
                      : ""
                  } hover:bg-purple-100 text-gray-800`}
                  onClick={() => handleMatchClick(match)}
                >
                  You Matched with{" "}
                  <span className="text-purple-700">{match.first_name}</span>!
                </button>
              ))}
        </div>
        <div className="border border-violet-200 overflow-auto text-gray-800 ">
          <h1 className="font-bold text-lg text-purple-800">
            Your previous matches
          </h1>
          {pastMatches.length > 0 &&
            pastMatches.map((match) => (
              <button
                key={match.id}
                className={`w-full text-left py-2 px-4 border border-fuchsia-200 ${
                  match.id === selectedMatch.id
                    ? "bg-purple-100 border-purple-700 border-l-4"
                    : ""
                } hover:bg-purple-100 text-gray-800`}
                onClick={() => handleMatchClick(match)}
              >
                You Matched with{" "}
                <span className="text-purple-700">{match.first_name}</span>!
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

Matching.propTypes = {
  isIntrovert: PropTypes.bool,
  isHidden: PropTypes.bool,
};

export default Matching;
