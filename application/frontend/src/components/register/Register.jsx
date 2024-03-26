import React from "react";
import { useForm } from "./hooks/useForm";
import { useUserAPI } from "./hooks/useUserAPI";

const Register = () => {
  const { formData, handleChange, errors, validateForm, setErrors } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { handleRegister, apiError } = useUserAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleRegister(formData, setErrors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="register-card">
          <h1>Register</h1>
          {errors.form && (
            <p className="text-red-500 text-xs italic">{errors.form}</p>
          )}
          {apiError && (
            <p className="text-red-500 text-xs italic">{apiError}</p>
          )}
          <div className="mb-4">
            <input
              required
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs italic">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              required
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs italic">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              required
              name="email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              required
              name="password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              required
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
