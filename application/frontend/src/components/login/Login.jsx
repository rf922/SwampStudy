import React, { useEffect, useState } from "react";
import { useFormValidation } from "./hooks/useFormValidation";
import { useUserAPI } from "./hooks/useUserAPI";
import ForgotPassword from "./../forgotpassword/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [view, setView] = useState("login");
  const [isFlipping, setIsFlipping] = useState(false);
  const [animation, setAnimation] = useState("");
  const { values, errors, handleChange, setErrors } = useFormValidation({
    email: "",
    password: "",
  });
  const { login } = useUserAPI();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(values.email, values.password, setErrors);
  };

  const handleViewChange = (newView) => {
    if (newView === "login") {
      setAnimation("animate-flipBack");
    } else {
      setAnimation("animate-flip");
    }

    setIsFlipping(true);
    setView(newView);
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimation("");
      setIsFlipping(false);
    }, 1000);
  }, [isFlipping]);

  return (
    <div className="h-full flex flex-col justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="grid md:grid-cols-3">
        <div className="flex justify-center text-2xl px-10">
          <p className="text-purple-800 font-bold leading-10">
            Welcome to Swamp Study!<br></br> We make finding your next study
            buddy easy!
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className={`relative w-80 h-80 perspective`}>
            <div className={`absolute w-full h-full ${animation}`}>
              {view === "login" ? (
                <div
                  className={`w-full h-full backface-hidden ${view === "login" ? "" : "hidden"}`}
                >
                  <form
                    onSubmit={handleLogin}
                    className="w-full border-2 border-gray-300 min-h-80 rounded-lg p-4 shadow-lg"
                  >
                    {!isFlipping && (
                      <>
                        <div className="mb-4">
                          {errors.form && (
                            <div className="text-red-500 text-xs italic">
                              {errors.form}
                            </div>
                          )}

                          <h1>Welcome!</h1>

                          <label
                            htmlFor="email"
                            className="block text-sm font-bold mb-2"
                          >
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
                              <p
                                key={index}
                                className="text-red-500 text-xs italic"
                              >
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
                              <p
                                key={index}
                                className="text-red-500 text-xs italic"
                              >
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
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                          >
                            Login
                          </button>
                          <div className="flex flex-col ml-4 space-y-2">
                            <span className="text-sm text-right">
                              Don&apos;t have an account?
                              <a
                                href="/register"
                                className="font-bold text-purple-500 hover:text-purple-800 ml-1 hover:underline"
                              >
                                Register
                              </a>
                            </span>
                            <span className="text-sm text-right">
                              <button
                                type="button"
                                onClick={() =>
                                  handleViewChange("forgotPassword")
                                }
                                className="font-bold text-purple-500 hover:text-purple-800 ml-1 hover:underline"
                              >
                                Forgot Password?
                              </button>
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              ) : (
                <div
                  className={`w-full min-h-80  h-full backface-hidden ${view === "forgotPassword" ? "" : "hidden"}`}
                >
                  <ForgotPassword
                    setView={handleViewChange}
                    isFlipping={isFlipping}
                  />
                </div>
              )}
            </div>
          </div>
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
