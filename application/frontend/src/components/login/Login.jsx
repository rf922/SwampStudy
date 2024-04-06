import React from "react";
import { useFormValidation } from "./hooks/useFormValidation";
import { useUserAPI } from "./hooks/useUserAPI";
//import { useAuth } from "./../../context/AuthContext";

export const Login = () => {
  const { values, errors, handleChange, setErrors } = useFormValidation({
    email: "",
    password: "",
  });
  const { login } = useUserAPI();

  const handleLogin = async (e) => {
    e.preventDefault();
    //if (!validate()) return; // qt if val fails
    login(values.email, values.password, setErrors);
  };
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="grid md:grid-cols-3">
        <div className="flex justify-center text-2xl px-10">
          <p className="text-purple-800 font-bold leading-10">
            Welcome to Swamp Study!<br></br> We make finding your next study
            buddy easy!
          </p>
        </div>
        <div className="flex justify-center">
          <form
            onSubmit={handleLogin}
            className="w-full border-2 border-gray-300 max-w-xs rounded-lg p-4 shadow-lg"
          >
            <div className="mb-4">
              {errors.form && (
                <div className="text-red-500 text-xs italic">{errors.form}</div>
              )}

              <h1>Welcome!</h1>

              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                className={`shadow appearance-none border ${errors.email && errors.email.length > 0 ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {errors.email &&
                errors.email.map((error, index) => (
                  <p key={index} className="text-red-500 text-xs italic">
                    {error}
                  </p>
                ))}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                className={`shadow appearance-none border ${errors.password && errors.password.length > 0 ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {errors.password &&
                errors.password.map((error, index) => (
                  <p key={index} className="text-red-500 text-xs italic">
                    {error}
                  </p>
                ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={Object.keys(errors).some(
                  (key) => errors[key].length > 0,
                )}
                className="bg-purple-500 hover:bg-purple-800 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mr-10"
                style={{ backgroundColor: "#c99700", borderColor: "#c99700" }} // Updated button color
              >
                Login
              </button>
              <a
                href="/register"
                className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800"
                style={{ color: "#463077" }} // Updated link color
              >
                Don&apos;t have an account? Register
              </a>
            </div>
          </form>
        </div>
        <div className="flex justify-center text-2xl leading-10">
          <p className="text-purple-800 font-bold">
            Log in or create an account to get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
