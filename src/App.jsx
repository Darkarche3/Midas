import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/loginPage.jsx";
import Home from "./pages/Home/homePage.jsx";
import Signup from "./pages/Signup/signupPage.jsx";
import UserDetailsForm from "./pages/Forms/UserDetailsForm.jsx";
import Auth from "./pages/AuthChoicePage/AuthPage.jsx";
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/form" element={<UserDetailsForm />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
