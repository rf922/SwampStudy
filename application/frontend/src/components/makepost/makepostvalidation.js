import {
  isValidTextFieldEntry,
  isValidThreadTitle,
} from "../../utils/validationUtils";

export const validateMakePostForm = ({ threadTitle, questionText }) => {
  const errors = [];
  isValidThreadTitle(threadTitle, errors);
  isValidTextFieldEntry(questionText, errors);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
