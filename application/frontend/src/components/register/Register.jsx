import React, { useState } from "react";
import { useFormValidation } from "./hooks/useFormValidation";
import { useUserAPI } from "./hooks/useUserAPI";
import { useFileAPI } from "./hooks/useFileAPI";

const Register = () => {

  const { formData, handleChange, errors, validate, setErrors } =
    useFormValidation({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: null,
    });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const { handleFileInputChange, uploadImage, imagePreviewUrl } = useFileAPI();
  const [file, setFile] = useState(null);
  const { handleRegister } = useUserAPI();

  const onFileInput = async (e) => {
    const file = handleFileInputChange(e);
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || !termsAccepted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        terms: "You must accept the terms and conditions.",
      }));
      return;
    }

    try {
      if (file) {
        const imageUrl = await uploadImage(file);
        const completeFormData = { ...formData, profilePicture: imageUrl };
        await handleRegister(completeFormData, setErrors);
      } else {
        await handleRegister(formData, setErrors);
      }
      console.log("Registration successful");
    } catch (uploadError) {
      console.error("Upload failed: ", uploadError);
      setErrors((prevErrors) => ({
        ...prevErrors,
        profilePicture: "Failed to upload image.",
      }));
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl border-2 border-gray-300 rounded-lg p-4 shadow-lg flex md:flex-row"
        >
          <div className="flex-1">
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
          <div className="flex-1 flex flex-col items-center p-4">
            <div className="max-w-full min-w-[250px] min-h-[250px] rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200 transition duration-200 ease-in-out hover:shadow-2xl hover:ring-4 hover:ring-yellow-300 hover:scale-105 focus:scale-105 focus:outline-none">
              <div className="flex items-center justify-center bg-purple-100 h-full">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Profile Preview"
                    style={{
                      width: "250px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="text-center text-gray-500"
                    style={{ width: "250px", height: "250px" }}
                  >
                    No image selected
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 py-4 bg-purple-50">
              {errors.firstName && (
                <p className="text-red-500 text-xs italic">
                  {errors.profilePicture}
                </p>
              )}

              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={onFileInput}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-200 file:text-purple-700 hover:file:bg-purple-300"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
