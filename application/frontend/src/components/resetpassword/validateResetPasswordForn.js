import {
  isValidPassword,
  isValidConfirmPassword,
} from "../../utils/validationUtils";

export const validateResetPasswordForm = ({ password, confirmPassword }) => {
  const errors = [];

  if (password) {
    isValidPassword(password, errors);
  }
  if (confirmPassword) {
    isValidConfirmPassword(password, confirmPassword, errors);
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
