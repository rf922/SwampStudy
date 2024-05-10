import {
  isValidName,
  isValidTextFieldEntry,
} from "../../utils/validationUtils";

export const validateUserProfile = ({ first_name, last_name, biography }) => {
  const errors = [];

  if (first_name) {
    isValidName(first_name, errors);
  }
  if (last_name) {
    isValidName(last_name, errors);
  }
  if (biography) {
    isValidTextFieldEntry(biography, errors);
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
