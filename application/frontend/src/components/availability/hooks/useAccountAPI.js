import axios from "axios";

export const useAccountAPI = () => {
  const updateAvailability = async (data) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/account/update`,
        data,
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };
  return { updateAvailability };
};
