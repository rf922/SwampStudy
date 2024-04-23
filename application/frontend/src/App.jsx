import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/about/About";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Forum from "./components/forum/Forum";
import Account from "./components/account/accountsettings";
import ProtectedRoute from "./components/protectedroute/protectedroute";
import Post from "./components/post/Post";
import Makepost from "./components/makepost/Makepost";
import Matching from "./components/matching/Matching";
import Settings from "./components/settings/Settings";
import UserProfile from "./components/userProfile/UserProfile";
import TermsAndConditions from "./components/termsAndConditions/termsAndConditions";
import Image from "./components/image/Image";
import Footer from "./components/footer/footer";
import { Auth } from "./context/AuthContext";
import PrivacyPolicy from "./components/privacypolicy/PrivacyPolicy";
import Contact from "./components/contact/contact";
import Licensing from "./components/licensing/licensing";
function App() {
  return (
    <Auth>
      <Router>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/post/:questionId" element={<Post />} />
              <Route path="/about/:name" element={<Profile />} />
              <Route path="/about/" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/register" element={<Register />} />
              <Route path="/matching" element={<Matching />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/image" element={<Image />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings /> {/* wrp acc comp in ProtectedRoute */}
                  </ProtectedRoute>
                }
              />

              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account /> {/* wrp acc comp in ProtectedRoute */}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/makepost"
                element={
                  <ProtectedRoute>
                    <Makepost />
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
    </Auth>
  );
}

export default App;
