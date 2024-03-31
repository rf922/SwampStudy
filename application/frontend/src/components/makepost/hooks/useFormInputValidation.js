import React, { useState } from "react"; // remove eslint config later, leave for dev
export const useFormInputValidation = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case "threadTitle":
        if (!value || /[^a-zA-Z0-9 ]/.test(value)) {
          return "Title must not be empty or contain special characters.";
        }
        break;
      case "questionText":
        if (value.length > 195) {
          return "Question must be less than 196 characters.";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, handleInputChange, errors, setFormData };
};

export default useFormInputValidation;
