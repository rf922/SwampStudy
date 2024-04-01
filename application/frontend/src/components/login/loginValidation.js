import { isValidEmail, isValidPassword } from "../../utils/validationUtils";

export const validateLoginForm = ({ email, password }) => {
  let errors = { email: [], password: [] };
  isValidEmail(email, errors);
  isValidPassword(password, errors);

  // filt out any empty error arrays to maintain the original structure
  Object.keys(errors).forEach((key) => {
    if (errors[key].length === 0) delete errors[key];
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
