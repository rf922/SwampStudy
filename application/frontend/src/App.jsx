import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/about/About';
import Profile from './components/profile/Profile';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/:name" element={<Profile />} />
        <Route path="/about/" element={<About />} />
        
      </Routes>
    </div>
  );
}

export default App;
