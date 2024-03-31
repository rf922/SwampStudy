import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateLoginForm } from "./loginValidation";

/*import "./login.css";*/

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // useNavigate
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent def form sub

    const validationResult = validateLoginForm({ email, password });
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return; // stop the login if validation fail
    }

    // clear prev errors
    setErrors({});
    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("User Login successful");
        console.log(JSON.stringify(response.data));
        setIsLoggedIn(true);
        navigate("/");
      } else {
        console.log("User Login unsuccessful");
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.data.error) {
          case "user_not_found":
            setErrors({
              ...errors,
              email: "Please try again.",
              form: "Invalid email or password",
            });
            break;
          case "invalid_password":
            setErrors({
              ...errors,
              password: "Please try again.",
              form: "Invalid email or password",
            });
            break;
          default:
            setErrors({
              ...errors,
              form: "An error occurred. Please try again later.",
            });
        }
      } else {
        console.error("Error during login:", err);
        setErrors({ ...errors, form: "An unknown error occurred." });
      }
    }
  };

  const validateField = (name, value) => {
    const validationResult = validateLoginForm({
      email,
      password,
      [name]: value,
    });
    setErrors(validationResult.errors);
  };

  const handleInputChange = (field, value) => {
    const setFunctionMap = {
      email: setEmail,
      password: setPassword,
    };

    if (setFunctionMap[field]) {
      setFunctionMap[field](value);
    }

    validateField(field, value);
  };

  return (
    <div className="flex justify-center items-start h-screen pt-20">
      <form
        onSubmit={handleLogin}
        className="w-full border-2 border-gray-300 max-w-xs rounded-lg p-4 shadow-lg"
      >
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
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
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
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
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
            className="bg-purple-500 hover:bg-violet-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mr-10"
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
