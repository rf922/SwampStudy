import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex flex-row px-4">
        <div className="basis-1/6">
          <Link to="/">Home</Link>
        </div>
        <div className="basis-1/6">
          <Link to="/about">About</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
