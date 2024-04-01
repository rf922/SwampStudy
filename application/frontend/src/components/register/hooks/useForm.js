import { useState } from "react";
import { validateRegistrationForm } from "./../registrationValidation";
import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from "./../../../utils/validationUtils";
export const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors, [name]: [] };
      delete newErrors.form;
      return newErrors;
    });
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

  const validateForm = () => {
    const validationResult = validateRegistrationForm(formData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return false;
    }
    return true;
  };

  return { formData, handleChange, errors, validateForm, setErrors };
};
