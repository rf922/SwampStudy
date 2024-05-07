import axios from "axios";

export const useUserAPI = () => {
  const reportUser = async (user) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/report/${user.userId}`,
        {},
        { withCredentials: true },
      );

      if (response.status === 200) {
        console.log("User reported : " + response.data);
      }
    } catch (err) {
      console.error("Unknown error during report:", { err });
    }
  };

  return { reportUser };
};

export default useUserAPI;
