import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useUserAPI = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData, setErrors) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        formData,
      );
      if (result.status === 201) {
        navigate("/");
      }
    } catch (err) {
      const errorMessages = {};
      if (err.response) {
        switch (err.response.status) {
          case 409:
            errorMessages.form = "A user already exists with that email";
            break;
          default:
            errorMessages.form = "An error occurred. Please try again later.";
            break;
        }
      } else {
        console.error("Unknown error during login:", { err });
        errorMessages.form = "An unknown error occurred.";
      }
      setErrors(errorMessages);
    }
  };

  return { handleRegister };
};
