import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateLoginForm } from "../../utils/loginValidation";

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
        { withCredentials: true },
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
      console.error(
        "User Failed To log in : ",
        err?.response ? err.response.data : err,
      );
      console.error("Request URL:");
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateField("email", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateField("password", e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-xs">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            placeholder="Type your email"
            value={email}
            onChange={handleEmailChange}
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
            placeholder="Type your password"
            value={password}
            onChange={handlePasswordChange}
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
