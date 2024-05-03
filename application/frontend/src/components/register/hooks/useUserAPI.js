import axios from "axios";

export const useUserAPI = (setView) => {
  const handleRegister = async (formData, setErrors) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        formData,
        { withCredentials: true },
      );

      if (result.status === 201) {
        console.log("success");
        setView(1);
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
