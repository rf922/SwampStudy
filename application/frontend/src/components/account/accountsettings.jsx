import React, { useEffect, useState } from "react";
import { useFormValidation } from "./hooks/useFormValidation";
import { useAccountAPI } from "./hooks/useAccountAPI";
import { useUserDetails } from "../../context/UserContext";

const UpdateAccount = () => {
  const { formData, setFormData, handleChange, validate, errors } =
    useFormValidation({
      email: "",
      password: "",
      confirmPassword: "",
      introvert: false,
      isHidden: false,
      educator: false,
    });
  const { userDetails, setUserDetails } = useUserDetails();
  const [options, setOptions] = useState({
    introvert: false,
    isHidden: false,
    educator: false,
  });

  const handleToggle = (option) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));

    setFormData((prevForm) => ({
      ...prevForm,
      [option]: !prevForm[option],
    }));
  };

  useEffect(() => {
    if (userDetails) {
      setOptions({
        introvert: userDetails.introvert ?? false,
        isHidden: userDetails.isHidden ?? false,
        educator: userDetails.educator ?? false,
      });
      setFormData((prevForm) => ({
        ...prevForm,
        introvert: userDetails.introvert ?? false,
        isHidden: userDetails.isHidden ?? false,
        educator: userDetails.educator ?? false,
        email: userDetails.email ?? "",
      }));
    }
  }, [userDetails, setFormData]);

  const { updateAccount, deleteAccount } = useAccountAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(formData)) {
      await updateAccount(formData, (errors) => console.log(errors));

      const updatedDetails = {
        ...userDetails,
        introvert: options.introvert,
        isHidden: options.isHidden,
        educator: options.educator,
        email: formData.email,
      };

      setUserDetails(updatedDetails);
      localStorage.setItem("userDetails", JSON.stringify(updatedDetails));
    } else {
      console.error("Please Try again");
      alert("Please Try Again");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-violet-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl h-full max-h-screen p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-center text-purple-800 my-6">
          Update Account
        </h1>

        {/* email */}
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

        {/* new password */}
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

        {/* confirm password */}
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

        {/* option toggle switches */}
        <div className="w-full flex flex-col my-4 mx-2 p-4 bg-purple-100">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 px-4 py-2">
            {Object.entries(options).map(([option, isSet], index) => (
              <label
                key={index}
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isSet}
                  onChange={() => handleToggle(option)}
                />
                <div className="toggle-bg relative w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                <span className="ml-3 overflow-hidden text-sm font-medium text-gray-900">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* form errors */}
        {errors.form && (
          <p className="text-red-500 text-xs italic mb-4">{errors.form}</p>
        )}

        {/* update account & delete account buttons */}
        <div className="flex flex-col w-full space-y-4 mb-6">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
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
