import { useState } from "react";
import { validateUserProfile } from "../validateUserProfile";
import {
  isValidName,
  isValidTextFieldEntry,
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
        form: prevErrors.form ? null : undefined,
      }));
    }
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let fieldErrors = [];
    if (name === "first_name") isValidName(value, fieldErrors);
    if (name === "last_name") isValidName(value, fieldErrors);
    if (name === "biography") isValidTextFieldEntry(value, fieldErrors);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors }));
  };

  const validate = () => {
    const { isValid, errors: validationErrors } = validateUserProfile(formData);
    if (!isValid) {
      setErrors((prevErrors) => ({
        //update errors
        ...prevErrors,
        ...validationErrors,
        form: "Please fix the errors before submitting.", // prompt to fix other erros
      }));
      return false;
    }
    return true;
  };

  return { formData, handleChange, setFormData, errors, validate, setErrors };
};

export default useFormValidation;
