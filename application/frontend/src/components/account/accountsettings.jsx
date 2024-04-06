import React from "react";
import { useFormValidation } from "./hooks/useFormValidation";
import { useAccountAPI } from "./hooks/useAccountAPI";

const UpdateAccount = () => {
  //component for accountmanagement / update
  const { formData, handleChange, validate, errors } = useFormValidation({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { updateAccount, deleteAccount } = useAccountAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value && key !== "confirmPassword") {
        acc[key] = value;
      }
      return acc;
    }, {});
    if (validate(dataToSend)) {
      updateAccount(dataToSend, (errors) => console.log(errors));
    } else {
      console.error("Please Try again");
      alert("Please Try Again");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-4">
          Update Account
        </h1>

        {/* FirstName */}
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-purple-700 text-sm font-bold mb-2"
          >
            First Name
          </label>
          <input
            name="firstName"
            id="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs italic">{errors.firstName}</p>
          )}
        </div>

        {/* LastName */}
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-purple-700 text-sm font-bold mb-2"
          >
            Last Name
          </label>
          <input
            name="lastName"
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-purple-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>

        {/* NewPassword */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-purple-700 text-sm font-bold mb-2"
          >
            New Password (optional)
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>

        {/* ConfirmPassword */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-purple-700 text-sm font-bold mb-2"
          >
            Confirm New Password
          </label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
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

        {/* Form Errors */}
        {errors.form && (
          <p className="text-red-500 text-xs italic mb-4">{errors.form}</p>
        )}

        {/* Update Account Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gold hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
          >
            Update Account
          </button>
          <button
            type="button"
            onClick={deleteAccount}
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccount;
