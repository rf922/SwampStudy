import axios from "axios";

const useRatingAPI = () => {
  const submitRating = async (rating, userId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/rating/`,
        {
          rating: rating,
          userId: userId,
        },
        { withCredentials: true },
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Problem submitting rating for user", error);
    }
  };

  return { submitRating };
};

export default useRatingAPI;
