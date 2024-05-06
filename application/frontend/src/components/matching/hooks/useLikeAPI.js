import axios from "axios";

const useLikeAPI = () => {
  const createLike = async (user) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/like/`,
        {
          userId2: user.id,
        },
        { withCredentials: true },
      );
      console.log("Response: to like ", response.data);
      return response.data;
    } catch (error) {
      console.error("Problem submitting like for user");
    }
  };

  return { createLike };
};

export default useLikeAPI;
