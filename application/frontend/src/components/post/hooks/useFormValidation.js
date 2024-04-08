import { useState } from "react";
import { isValidTextFieldEntry } from "../../../utils/validationUtils";
import { validateAnswerForm } from "../../post/postAnswerValidation";
export const useFormValidation = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
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

  const validateField = (name, value) => {
    let errors = [];
    switch (name) {
      case "answer":
        isValidTextFieldEntry(value, errors);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errors }));
  };

  const validate = () => {
    const validationResult = validateAnswerForm(formData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return false;
    }
    return true;
  };

  return { formData, handleChange, errors, validate, setErrors };
};
