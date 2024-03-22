import { useState } from "react";
import { validateLoginForm } from "./../loginValidation";

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // update field vals/ form vals
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    // update errors based on new values
    setValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };
      const validationResult = validateLoginForm(updatedValues);
      setErrors(validationResult.isValid ? {} : validationResult.errors);
      return updatedValues;
    });
  };

  const validate = () => {
    const validationResult = validateLoginForm(values);
    setErrors(validationResult.errors);
    return validationResult.isValid;
  };

  return { handleChange, values, errors, validate, setErrors };
};

export default useForm;
