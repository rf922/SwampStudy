import axios from "axios";

export const useAccountAPI = () => {
  const updateAvailability = async (data) => {
    try {
      console.log("The data being sent ", { data });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/account/update`,
        data,
        { withCredentials: true },
      );
      if (response.status === 200) {
        console.log("updated success");
      }
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };
  return { updateAvailability };
};
