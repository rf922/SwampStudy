import axios from "axios";
import { useState, useEffect } from "react";

const useMatchAPI = (matchFound, pageNum) => {
  const [matchList, setMatchList] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null); // track sel match

  useEffect(() => {
    const getUserMatchList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/match/`,
          { withCredentials: true },
        );
        const newMatches = response.data;
        console.log("Fetched matches:", newMatches);

        if (newMatches.length > 0) {
          console.log("Sample match:", newMatches[0]);
        }

        setMatchList((currentMatches) => {
          const updatedMatches = newMatches.filter(
            (newMatch) =>
              !currentMatches.some((match) => match.id === newMatch.id) &&
              newMatch.recent,
          );
          console.log("New recent matches to add:", updatedMatches);
          return [...currentMatches, ...updatedMatches];
        });

        // Update past matches filtering out duplicates
        setPastMatches((currentPastMatches) => {
          const newPastMatches = newMatches.filter(
            (newMatch) =>
              !newMatch.recent &&
              !currentPastMatches.some(
                (pastMatch) => pastMatch.id === newMatch.id,
              ),
          );
          console.log("New past matches to add:", newPastMatches);
          return [...currentPastMatches, ...newPastMatches];
        });

        const firstRecentMatch = newMatches.find((match) => match.recent);
        if (firstRecentMatch) {
          setSelectedMatch(firstRecentMatch);
        }
      } catch (error) {
        console.log("Error fetching matches:", error);
      }
    };
    getUserMatchList();
  }, [pageNum]);

  useEffect(() => {
    const getFoundMatch = async () => {
      if (!matchFound) return;
      try {
        console.log(JSON.stringify(matchFound));
        if (!matchFound.id || !matchFound.id) return;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/match/userMatch/`,
          {
            params: {
              userId1: matchFound.userOne.id,
              userId2: matchFound.userTwo.id,
            },
          },
        );
        const newMatch = response.data;
        console.log({ response });
        setMatchList((prevMatches) => [...prevMatches, newMatch]);
        setSelectedMatch(newMatch);
        console.log("Match just came in : " + newMatch);
      } catch (error) {
        console.log("Problem getting the match :" + error);
      }
    };
    getFoundMatch();
  }, [matchFound]);

  return { pastMatches, matchList, selectedMatch, setSelectedMatch };
};

export default useMatchAPI;
