import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

export const useAccountAPI = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const updateAccount = async (formData, setErrors) => {
    const trimmedData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (key !== "confirmPassword") {
        acc[key] = value;
      }
      return acc;
    }, {});
    try {
      //console.log(JSON.stringify(trimmedData));
      await axios.post(
        `${process.env.REACT_APP_API_URL}/account/update`,
        trimmedData,
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

  const deleteAccount = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/account/delete`,
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        setIsLoggedIn(false);
        toast.success("Your account and data was deleted succefully !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return { updateAccount, deleteAccount };
};

export default useAccountAPI;
