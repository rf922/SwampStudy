import { useState } from "react";
import { validateLoginForm } from "../loginValidation";
//import { isValidEmail, isValidPassword } from "../../../utils/validationUtils";

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors, [name]: [] };
      delete newErrors.form;
      return newErrors;
    });

    //validateField(name, value);
  };
  /*
  const validateField = (name, value) => {
    let fieldErrors = [];
    if (name === "email") isValidEmail(value, fieldErrors);
    if (name === "password") isValidPassword(value, fieldErrors);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors }));
  };
*/
  const validate = () => {
    const { isValid, errors: validationErrors } = validateLoginForm(values);
    setErrors(validationErrors);
    return isValid;
  };

  return { handleChange, values, errors, validate, setErrors };
};

export default useForm;
