import "./App.css";
import React from "react";
import About from "./components/about/About";
import Profile from "./components/profile/Profile";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about/:name" element={<Profile />} />
        <Route path="/about/" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
