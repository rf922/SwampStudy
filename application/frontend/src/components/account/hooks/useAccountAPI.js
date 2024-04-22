import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export const useAccountAPI = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const updateAccount = async (dataToSend, setErrors) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/account/update`,
        dataToSend,
        { withCredentials: true },
      );
      if (response.status === 200) {
        alert("Account updated successfully!");
      }
    } catch (error) {
      console.error("Error updating account:", error);
      setErrors({
        form:
          error.response?.data.message ||
          "An error occurred while updating the account.",
      });
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/account/delete`,
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate("/");
        alert("Deleted account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return { updateAccount, deleteAccount };
};

export default useAccountAPI;
