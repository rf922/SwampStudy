import axios from "axios";

export const useUserAPI = () => {
  const submitPasswordReset = async (formData, userId, token, setErrors) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/resetPassword`, {
        userId,
        token,
        newPassword: formData.password,
      });
    } catch (err) {
      const errorMessages = {};
      if (err.response) {
        switch (err.response.status) {
          case "401":
            errorMessages.form =
              "Password reset window expired please request a new link";
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

  return { submitPasswordReset };
};
