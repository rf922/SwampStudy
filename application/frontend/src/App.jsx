import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/about/About";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import ProtectedRoute from "./components/protectedroute/protectedroute";
import Post from "./components/post/Post";
import Settings from "./components/settings/Settings";
import TermsAndConditions from "./components/termsandconditions/TermsAndConditions";
import Footer from "./components/footer/footer";
import { Auth } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import PrivacyPolicy from "./components/privacypolicy/PrivacyPolicy";
import Contact from "./components/contact/contact";
import Licensing from "./components/licensing/licensing";

import ResetPassword from "./components/resetpassword/ResetPassword";
import TokenProtectedRoute from "./components/tokenprotectedroute/TokenProtectedRoute";

function App() {
  return (
    <Auth>
      <UserProvider>
        {" "}
        {/* Wrap the app in UserProvider */}
        <Router>
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:questionId" element={<Post />} />
                <Route path="/about/:name" element={<Profile />} />
                <Route path="/about/" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/reset-password"
                  element={
                    <TokenProtectedRoute>
                      <ResetPassword />
                    </TokenProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/licensing" element={<Licensing />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </Auth>
  );
}

export default App;
