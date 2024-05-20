import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useUserAPI = () => {
  const recoverPassword = async (email, setErrors) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/recoverPassword`,
        { email },
      );
      console.log({ response });
      if (response.status === 200) {
        toast.success("Recovery email sent. Please check your inbox.");
      }
    } catch (err) {
      const errorMessages = {};
      if (err.response) {
        switch (err.response.status) {
          case 401:
            errorMessages.form = "Invalid email";
            break;
          case 404:
            errorMessages.form = "User not found.";
            break;
          default:
            errorMessages.form = "An error occurred. Please try again later.";
            break;
        }
      } else {
        errorMessages.form = "An unknown error occurred.";
      }
      toast.error("Failed to send recovery email. Please try again.");
      setErrors(errorMessages);
      console.log({ err });
    }
  };

  return { recoverPassword };
};

export default useUserAPI;
