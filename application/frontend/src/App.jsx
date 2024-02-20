import logo from './logo.svg';
import './App.css';
import About from "./components/About";
import { Link } from 'react-router-dom';
import Lennart from './components/Lennart';
import Home from './components/Home';

import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<About />} />
        <Route path="lennart" element={<Lennart />} />
      </Routes>
    </div>
  );
}

export default App;
