import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useUserAPI = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData, setErrors) => {
    try {
      const result = await axios.post(
        "https://swamp-study.global.ssl.fastly.net/api/user/register",
        formData,
      );
      if (result.status === 201) {
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        const errorMessage =
          err.response.data.message || "An error occurred during registration.";
        setErrors(errorMessage);
        if (err.response.status === 409) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "An account with this email already exists.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            form: errorMessage,
          }));
        }
      } else {
        console.error("Error during registration:", err);
        setErrors("An unknown error occurred.");
      }
    }
  };

  return { handleRegister };
};
