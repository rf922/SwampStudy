import { useState } from "react";
import { validateUpdateForm } from "../accountsettingsvalidation";
import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from "../../../utils/validationUtils";

export const useFormValidation = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
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
    let fieldErrors = [];
    if (name === "first_name") isValidName(value, fieldErrors);
    if (name === "last_name") isValidName(value, fieldErrors);
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

  return { formData, setFormData, handleChange, errors, validate, setErrors };
};

export default useFormValidation;
