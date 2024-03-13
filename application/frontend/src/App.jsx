import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/about/About";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import { Auth } from "./context/AuthContext";

function App() {
  return (
    <Auth>
      <div className="wrapper">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/:name" element={<Profile />} />
            <Route path="/about/" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </Auth>
  );
}

export default App;
