import { isValidEmail } from "../../utils/validationUtils";

export const validateForgotPasswordForm = ({ email }) => {
  const errors = [];
  isValidEmail(email, errors);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
