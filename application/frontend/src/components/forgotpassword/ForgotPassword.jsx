import React from "react";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import useUserAPI from "./hooks/useUserAPI";
import { useFormValidation } from "./hooks/useFormValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = ({ setView, isFlipping }) => {
  const { formData, errors, handleChange, validate, setErrors } =
    useFormValidation({
      email: "",
    });

  const { recoverPassword } = useUserAPI();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(formData)) {
      await recoverPassword(formData.email, setErrors);
      setView("login");
    } else {
      toast.error("Please fix any errors before submitting");
    }
  };

  return (
    <div className="absolute w-full h-full ">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full border-2 border-gray-300 rounded-lg p-4 shadow-lg bg-white"
      >
        {!isFlipping && (
          <>
            {" "}
            {errors.form && (
              <div className="text-red-500 text-xs italic">{errors.form}</div>
            )}
            <h1 className="mb-4 text-xl font-semibold">Forgot Password</h1>
            <div className="mb-4">
              <input
                required
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email &&
                errors.email.map((error, index) => (
                  <p key={index} className="text-red-500 text-xs italic">
                    {error}
                  </p>
                ))}
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Send Recovery Email
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setView("login")}
                className="text-sm text-purple-500 hover:text-purple-800 underline focus:outline-none"
              >
                Return to Login
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

ForgotPassword.propTypes = {
  setView: PropTypes.func.isRequired,
  isFlipping: PropTypes.bool.isRequired,
};

export default ForgotPassword;
