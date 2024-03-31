import { isValidEmail, isValidPassword } from "../../utils/validationUtils";

export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!isValidEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!isValidPassword(password)) {
    errors.password = "invalid email or Password";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
