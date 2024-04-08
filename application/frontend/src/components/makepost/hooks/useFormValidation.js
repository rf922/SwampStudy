import { useState } from "react"; // remove eslint config later, leave for dev
import {
  isValidTextFieldEntry,
  isValidThreadTitle,
} from "./../../../utils/validationUtils";
import { validateMakePostForm } from "../makepostvalidation";

export const useFormValidation = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);

  const validateField = (name, value) => {
    let errors = [];
    switch (name) {
      case "threadTitle":
        isValidThreadTitle(value, errors);
        break;
      case "questionText":
        isValidTextFieldEntry(value, errors);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errors }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name] && errors[name].length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: [],
      }));
    }
    validateField(name, value);
  };

  const validate = () => {
    const validationResult = validateMakePostForm(formData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return false;
    }
    return true;
  };

  return { formData, handleInputChange, errors, setFormData, validate };
};

export default useFormValidation;
