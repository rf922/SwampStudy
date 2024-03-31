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
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!isValidName(value)) error = "Invalid Name";
        break;
      case "email":
        if (!isValidEmail(value)) error = "Invalid email format";
        break;
      case "password":
        if (!isValidPassword(value)) error = "Invalid Password, "; // \nPassword must be at least 8-16 characters long \nPassword must contain ateast one number";
        break;
      case "confirmPassword":
        if (!isValidConfirmPassword(formData.password, value))
          error = "Passwords must match";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
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
