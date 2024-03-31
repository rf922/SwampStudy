import React from "react";
import { useForm } from "./hooks/useForm";
import { useUserAPI } from "./hooks/useUserAPI";

/*import "./login.css";*/

const Login = () => {
  const { values, errors, handleChange, validate, setErrors } = useForm({
    email: "",
    password: "",
  });
  const { login } = useUserAPI();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return; // qt if val fails

    login(values.email, values.password, setErrors);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-xs">
        <div className="mb-4">
          {errors.form && (
            <div className="text-red-500 text-xs italic">{errors.form}</div>
          )}

          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Type email"
            value={values.email}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.email ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Password
          </label>
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="Type your password"
            value={values.password}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.password ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        {errors.form && (
          <p className="text-red-500 text-xs italic">{errors.form}</p>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className="bg-purple-500 hover:bg-violet-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            Login
          </button>
          <a
            href="/register"
            className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800"
          >
            Don&apos;t have an account? Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
