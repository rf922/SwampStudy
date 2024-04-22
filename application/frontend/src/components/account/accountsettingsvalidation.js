import {
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from "../../utils/validationUtils";

export const validateUpdateForm = ({ email, password, confirmPassword }) => {
  const errors = [];

  if (email) {
    isValidEmail(email, errors);
  }

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
