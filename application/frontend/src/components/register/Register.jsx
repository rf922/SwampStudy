import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateRegistrationForm } from "../../utils/registrationValidation";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationResult = validateRegistrationForm({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return; // stop the login if validation fail
    }

    setErrors({});
    try {
      const result = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          firstName,
          lastName,
          email,
          password,
        },
      );
      if (result.status === 201) {
        console.log(JSON.stringify(result.data) + confirmPassword);
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrors((prevErrors) => ({
          //user already exists
          ...prevErrors,
          email: "An account with this email already exists.",
        }));
      } else if (err.response) {
        const errorMessage =
          err.response.data.message || "An error occurred during registration.";
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: errorMessage,
        }));
      } else {
        console.error("Error during registration:", err);
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: "An unknown error occurred.",
        }));
      }
    }
  };

  const validateField = (name, value) => {
    const validationResult = validateRegistrationForm({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationResult.errors[name],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const setters = {
      firstName: setFirstName,
      lastName: setLastName,
      email: setEmail,
      password: setPassword,
      confirmPassword: setConfirmPassword,
    };

    setters[name](value);

    validateField(name, value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="w-full max-w-xs">
        <div className="register-card">
          <h1>Register</h1>
          <label htmlFor="firstname" className="block text-sm font-bold mb-2">
            First Name
          </label>
          {errors.form && (
            <p className="text-red-500 text-xs italic">{errors.form}</p>
          )}
          <input
            required
            name="firstName"
            type="text"
            placeholder="Enter First Name"
            id="firstname"
            value={firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs italic">{errors.firstName}</p>
          )}
          <label htmlFor="lastname" className="block text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            required
            name="lastName"
            type="text"
            placeholder="Enter Last Name"
            id="lastname"
            value={lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic">{errors.lastName}</p>
          )}
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder="Enter email"
            id="email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Password
          </label>
          <input
            required
            name="password"
            type="password"
            placeholder="Enter password"
            id="password"
            value={password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
          <label
            htmlFor="confirm-password"
            className="block text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            required
            name="confirmPassword"
            type="password"
            placeholder="Type your password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.confirmPassword}
            </p>
          )}
          <br />
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800"
            >
              Login
            </a>
          </p>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-violet-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
