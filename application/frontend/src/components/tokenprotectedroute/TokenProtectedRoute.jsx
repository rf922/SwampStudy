import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import Loading from "../loading/Loading";

const TokenProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");
      const userId = searchParams.get("userId");

      if (!token || !userId) {
        setError("No token or user ID provided.");
        setIsLoading(false);
        return;
      }

      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/user/verifytoken`, {
          token,
          userId,
        });
        setIsTokenValid(true);
      } catch (err) {
        setError(
          "Invalid or expired token. Please try requesting a new password reset.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [location]);

  if (isLoading) {
    return (
      <div className="flex bg-purple-200 min-h-screen justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex bg-purple-200 min-h-screen justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return isTokenValid ? children : <Navigate to="/login" replace />;
};

TokenProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TokenProtectedRoute;
