import {
  isValidName,
  isValidEmail,
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

  if (!isValidName(firstName)) {
    errors.firstName = "Invalid First Name";
  }
  if (!isValidName(lastName)) {
    errors.lastName = "Invalid Last Name";
  }
  if (!isValidEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!followsPasswordReqs(password)) {
    errors.password = "Invalid Password";
  }

  if (!isValidConfirmPassword(password, confirmPassword)) {
    errors.confirmPassword = "Password and confirm Password must match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
const followsPasswordReqs = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  return passwordRegex.test(password);
};
