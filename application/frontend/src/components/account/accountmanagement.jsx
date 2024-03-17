import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from "../../utils/registrationValidation";

const UpdateAccount = () => {
  // takes fields from user, validates then sends to server to update acc.
  const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateUpdateForm = ({
    //performs validation on user input
    firstName,
    lastName,
    email,
    newPassword,
    confirmPassword,
  }) => {
    const errors = {};

    if (firstName && !isValidName(firstName)) {
      errors.firstName = "Invalid First Name";
    }
    if (lastName && !isValidName(lastName)) {
      errors.lastName = "Invalid Last Name";
    }
    if (email && !isValidEmail(email)) {
      errors.email = "Invalid email format";
    }
    // Only validate new password if it's provided
    if (newPassword && !isValidPassword(newPassword)) {
      errors.newPassword = "Invalid Password";
    }
    // Only check confirmPassword if newPassword is provided
    if (newPassword && !isValidConfirmPassword(newPassword, confirmPassword)) {
      errors.confirmPassword = "Password and Confirm Password must match";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleChange = (e) => {
    //updates the field value and validates
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    const formErrors = validateUpdateForm({ ...formData, [name]: value });
    setErrors(formErrors.errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form data
    const validationResult = validateUpdateForm(formData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    // filter out empty fields and confirmPassword
    const dataToSend = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value && key !== "confirmPassword") {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const response = await axios.post(
        "http://localhost:8080/api/account/update",
        dataToSend,
        { withCredentials: true },
      );
      if (response.status === 200) {
        alert("Account updated successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating account:", error);
      setErrors({
        form:
          error.response?.data.message ||
          "An error occurred while updating the account.",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/account/delete",
        {},
        { withCredentials: true },
      );
      if (response.status == 200) {
        setIsLoggedIn(false);
        navigate("/");
        alert("Deleted account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <h1>Update Account</h1>

        <label htmlFor="firstName">First Name</label>
        <input
          name="firstName"
          id="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs italic">{errors.firstName}</p>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs italic">{errors.lastName}</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        )}

        <label htmlFor="newPassword">New Password (optional)</label>
        <input
          name="newPassword"
          id="newPassword"
          type="password"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-xs italic">{errors.newPassword}</p>
        )}

        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic">
            {errors.confirmPassword}
          </p>
        )}

        {errors.form && (
          <p className="text-red-500 text-xs italic">{errors.form}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Update Account
        </button>
        <a
          href="#delete-account"
          onClick={handleDeleteAccount}
          className="text-red-500 underline mt-4 hover:text-red-700"
          style={{ display: "block", cursor: "pointer" }}
        >
          Delete Account
        </a>
      </form>
    </div>
  );
};

export default UpdateAccount;
