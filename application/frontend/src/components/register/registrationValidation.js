import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from "../../utils/validationUtils";

export const validateRegistrationForm = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};
  isValidName(firstName, errors);
  isValidName(lastName, errors);
  isValidEmail(email, errors);
  isValidPassword(password, errors);
  isValidConfirmPassword(password, confirmPassword);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
