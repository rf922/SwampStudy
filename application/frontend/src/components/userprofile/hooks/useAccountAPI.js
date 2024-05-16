import axios from "axios";

export const useAccountAPI = () => {
  const updateProfile = async (dataToSend, setErrors) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/account/update`,
        dataToSend,
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Error updating account:", error);
      setErrors({
        form:
          error.response?.data.message ||
          "An error occurred while updating the account.",
      });
    }
  };

  return { updateProfile };
};

export default useAccountAPI;
