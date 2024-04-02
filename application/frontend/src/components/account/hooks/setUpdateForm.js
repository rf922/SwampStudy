import { useState } from "react";
import { validateUpdateForm } from "./../updateAccountValidation";
import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from "../../../utils/validationUtils";

export const useUpdateForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
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
    let fieldErrors = [];
    if (name === "firstName") isValidName(value, fieldErrors);
    if (name === "lastName") isValidName(value, fieldErrors);
    if (name === "email") isValidEmail(value, fieldErrors);
    if (name === "password") isValidPassword(value, fieldErrors);
    if (name === "confirmPassword")
      isValidConfirmPassword(formData.password, value, fieldErrors);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors }));
  };

  const validate = () => {
    const { isValid, errors: validationErrors } = validateUpdateForm(formData);
    setErrors(validationErrors);
    return isValid;
  };

  return { formData, handleChange, errors, validate, setErrors };
};

export default useUpdateForm;
