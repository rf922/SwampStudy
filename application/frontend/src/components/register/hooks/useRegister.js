import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const handleRegister = async (formData, setErrors) => {
    try {
      const result = await axios.post(
        "http://localhost:8080/api/user/register",
        formData,
      );
      if (result.status === 201) {
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        const errorMessage =
          err.response.data.message || "An error occurred during registration.";
        setApiError(errorMessage);
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
        setApiError("An unknown error occurred.");
      }
    }
  };

  return { handleRegister, apiError };
};
