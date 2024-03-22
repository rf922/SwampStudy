import { useState } from "react";
import { validateUpdateForm } from "./../updateAccountValidation";

export const useUpdateForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    const formErrors = validateUpdateForm({ ...formData, [name]: value });
    setErrors(formErrors.errors);
  };

  return { formData, handleChange, errors, setErrors };
};

export default useUpdateForm;
