import React from "react";
import { useFormValidation } from "./hooks/useFormValidation";
import { useUserAPI } from "./hooks/useUserAPI";

const Register = () => {
  const { formData, handleChange, errors, validate, setErrors } =
    useFormValidation({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const { handleRegister } = useUserAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate() && termsAccepted) {
      handleRegister(formData, setErrors);
    } else if (!termsAccepted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        terms: "You must accept the terms and conditions.",
      }));
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs border-2 border-gray-300 rounded-lg p-4 shadow-lg"
        >
          <div className="register-card">
            <h1>Register</h1>
            {errors.form && (
              <p className="text-red-500 text-xs italic">{errors.form}</p>
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
                <p className="text-red-500 text-xs italic">
                  {errors.firstName}
                </p>
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
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I have read and accept the{" "}
                  <a
                    href="terms-and-conditions"
                    className="text-purple-500 hover:text-purple-800"
                  >
                    terms and conditions
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-xs italic">{errors.terms}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
              <a
                href="/login"
                className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800"
              >
                Have an account? Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
