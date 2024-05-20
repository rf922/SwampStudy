import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormValidation } from "./hooks/useFormValidation";
import { useUserAPI } from "./hooks/useUserAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submitPasswordReset } = useUserAPI();
  const { formData, errors, handleChange, validate, setErrors } =
    useFormValidation({
      password: "",
      confirmPassword: "",
    });

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validate(formData)) {
        await submitPasswordReset(formData, userId, token, setErrors);
        toast.success("Password reset successful. Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error("Please fix all errors before submitting");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {errors.form && (
            <p className="text-red-500 text-xs italic mb-4">{errors.form}</p>
          )}
          <h1 className="block text-gray-700 text-lg font-bold mb-4">
            Reset Password
          </h1>
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-bold mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
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
              Reset Password
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-purple-500 hover:text-purple-800 ml-4"
            >
              Return to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
