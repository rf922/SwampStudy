import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Navbar;
