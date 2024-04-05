import { isValidTextFieldEntry } from "../../utils/validationUtils";

export const validateAnswerForm = ({ answer }) => {
  const errors = [];
  isValidTextFieldEntry(answer, errors);
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
