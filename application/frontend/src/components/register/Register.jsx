import React, { useState, useEffect } from "react";
import { useFormValidation } from "./hooks/useFormValidation";
import axios from "axios";
import { useUserAPI } from "./hooks/useUserAPI";
import UserProfile from "../userprofile/UserProfile";
import Availability from "../availability/Availability";
import ClassSchedule from "../classschedule/ClassSchedule";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [view, setView] = useState(0);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { formData, handleChange, errors, validate, setErrors } =
    useFormValidation({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: null,
    });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { handleRegister } = useUserAPI(setView);

  useEffect(() => {
    // effect for setting userDetails in local storage
    const getUserDetails = async () => {
      try {
        const localData = localStorage.getItem("userDetails");
        if (localData && isLoggedIn) {
          // if it exits and usr logged in
          console.log(localData);
          setView(1);
        } else if (isLoggedIn) {
          // logged in try to get the acc detials
          const userDetailsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/account/details`,
            { withCredentials: true },
          );
          console.log(userDetailsResponse);
          localStorage.setItem(
            //set the use detail obj,
            "userDetails",
            JSON.stringify(userDetailsResponse.data),
          );
          setView(1);
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    getUserDetails();
  }, [isLoggedIn, view]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (view === 1) {
      navigate("/");
    }
    setView(1);
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
      await handleRegister(formData, setErrors);
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          rating: 5,
        }),
      );
      setIsLoggedIn(true);

      console.log("Registration successful");
    } catch (error) {
      console.error("registration failed: ", error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      {view === 0 ? (
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
                  name="first_name"
                  type="text"
                  placeholder="Enter First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.first_name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  required
                  name="last_name"
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.last_name}
                  </p>
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
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
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
              {/** where the button is*/}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  onClick={handleSubmit}
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
      ) : (
        <div className="flex-2 md:flex-[3] ">
          <div className="overflow-auto  bg-violet-200 scrollbar-hide max-h-[620px]">
            <div className="bg-violet-200 mx-4 text-gray-800">
              <UserProfile />
            </div>
            <div className="bg-violet-200 mx-4 text-gray-800">
              <Availability />
            </div>
            <div className="bg-violet-200 mx-4 text-gray-800">
              <ClassSchedule />
            </div>
          </div>
        </div>
      )}
      {view === 1 && (
        <div className="flex w-full justify-center items-center my-4">
          <button
            onClick={handleClick}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-full sm:w-auto transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Finish Registration
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;
