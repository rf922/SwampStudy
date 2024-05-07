import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from "../../utils/validationUtils";

export const validateRegistrationForm = ({
  first_name,
  last_name,
  email,
  password,
  confirmPassword,
}) => {
  const errors = [];
  isValidName(first_name, errors);
  isValidName(last_name, errors);
  isValidEmail(email, errors);
  isValidPassword(password, errors);
  isValidConfirmPassword(password, confirmPassword);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
