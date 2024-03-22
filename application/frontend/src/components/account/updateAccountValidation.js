import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from "../../utils/validationUtils";

export const validateUpdateForm = ({
  firstName,
  lastName,
  email,
  newPassword,
  confirmPassword,
}) => {
  const errors = {};

  if (firstName && !isValidName(firstName)) {
    errors.firstName = "Invalid First Name";
  }
  if (lastName && !isValidName(lastName)) {
    errors.lastName = "Invalid Last Name";
  }
  if (email && !isValidEmail(email)) {
    errors.email = "Invalid email format";
  }
  if (newPassword && !isValidPassword(newPassword)) {
    errors.newPassword = "Invalid Password";
  }
  if (newPassword && !isValidConfirmPassword(newPassword, confirmPassword)) {
    errors.confirmPassword = "Password and Confirm Password must match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
