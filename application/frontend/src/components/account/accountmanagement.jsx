import React from "react";
import { useUpdateForm } from "./hooks/setUpdateForm";
import { useAccountActions } from "./hooks/useAccountActions";

const UpdateAccount = () => {
  //component for accountmanagement / update
  const { formData, handleChange, errors } = useUpdateForm({
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { updateAccount, deleteAccount } = useAccountActions();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // filt out empty fields and confirmPassword
    const dataToSend = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value && key !== "confirmPassword") {
        acc[key] = value;
      }
      return acc;
    }, {});

    updateAccount(dataToSend, (errors) => console.log(errors));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <h1>Update Account</h1>

        <div className="mb-4">
          <label htmlFor="firstName" className="block">
            First Name
          </label>
          <input
            name="firstName"
            id="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="input"
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}{" "}
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block">
            Last Name
          </label>
          <input
            name="lastName"
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="input"
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block">
            New Password (optional)
          </label>
          <input
            name="newPassword"
            id="newPassword"
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="input"
          />
          {errors.newPassword && <p className="error">{errors.newPassword}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block">
            Confirm New Password
          </label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        {errors.form && <p className="error">{errors.form}</p>}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Update Account
        </button>
        <button
          type="button"
          onClick={deleteAccount}
          className="text-red-500 underline mt-4 hover:text-red-700"
          style={{ display: "block", cursor: "pointer" }}
        >
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default UpdateAccount;
