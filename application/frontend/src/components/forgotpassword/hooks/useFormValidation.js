import { useState } from "react";
import { isValidEmail } from "../../../utils/validationUtils";
import { validateForgotPasswordForm } from "../validateForgotPasswordForm";

export const useFormValidation = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

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
      case "email":
        isValidEmail(value, errors);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errors }));
  };

  const validate = () => {
    const validationResult = validateForgotPasswordForm(formData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return false;
    }
    return true;
  };

  return { formData, setFormData, handleChange, errors, validate, setErrors };
};
