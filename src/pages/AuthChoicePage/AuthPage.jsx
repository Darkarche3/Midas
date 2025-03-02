import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Login from '../Login/loginPage.jsx';
import Signup from '../Signup/signupPage.jsx';
import './AuthPage.scss';

const AuthPage = () => {
  return (
    <div className="auth-page-container">
      <h1>Welcome to Midas</h1>
      <p className="subline">Turn your fortunes around with a touch</p>
      <div className="auth-options">
        <Link to="/login" className="auth-link">Login</Link>
        <Link to="/signup" className="auth-link">Sign Up</Link>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default AuthPage;