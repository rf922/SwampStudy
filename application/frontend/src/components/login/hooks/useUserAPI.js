import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export const useUserAPI = () => {
  //hook for login
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const login = async (email, password, setErrors) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        { email, password },
        { withCredentials: true },
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      const errorMessages = {};
      if (err.response) {
        switch (err.response.status) {
          case 401:
            errorMessages.form = "Invalid email or password.";
            break;
          case 404:
            errorMessages.form = "User not found.";
            break;
          default:
            errorMessages.form = "An error occurred. Please try again later.";
            break;
        }
      } 
    

       else {
        console.error("Unknown error during login:", {err});
        errorMessages.form = "An unknown error occurred.";
      }

      setErrors(errorMessages);
    }
  };

  return { login };
};

export default useUserAPI;
