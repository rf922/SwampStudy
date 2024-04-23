import { useState } from "react";
import { validateRegistrationForm } from "../registrationValidation";
import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from "../../../utils/validationUtils";

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
      case "firstName":
        isValidName(value, errors);
        break;
      case "lastName":
        isValidName(value, errors);
        break;
      case "email":
        isValidEmail(value, errors);
        break;
      case "password":
        isValidPassword(value, errors);
        break;
      case "confirmPassword":
        isValidConfirmPassword(formData.password, value, errors);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errors }));
  };

  const validate = () => {
    const validationResult = validateRegistrationForm(formData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return false;
    }
    return true;
  };

  return { formData, setFormData, handleChange, errors, validate, setErrors };
};
