import axios from "axios";

const useMatchAPI = () => {
  /**
   * implement backend connection
   */
  const setMatchDetails = async (matchId, meetingDate) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/match/meeting`,
        {
          matchId: matchId,
          meetingDate: meetingDate,
        },
        { withCredentials: true },
      );
      const updatedMatch = response.data;
      console.log("got match :", updatedMatch);
    } catch (error) {
      console.log("Error seeting matches:", error);
    }
  };

  return { setMatchDetails };
};

export default useMatchAPI;
