import { useState } from "react";

export const useFormValidation = (initialState) => {
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
  };

  return { handleChange, values, errors, setErrors };
};

export default useFormValidation;
