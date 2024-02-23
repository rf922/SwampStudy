import logo from './logo.svg';
import './App.css';
import AboutMeRouter from "./routes/AboutMeRouter";
import { Link } from 'react-router-dom';
import Home from './components/Home';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/*" element={<AboutMeRouter />} />
      </Routes>
    </div>
  );
}

export default App;
