import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Login from '../Login/loginPage.jsx';
import Signup from '../Signup/signupPage.jsx';
import './AuthPage.scss';

const AuthPage = () => {
  return (
    <div className="auth-page-container">
      <h1>MIDAS</h1>
      <p className="welcome">WELCOME! <span role="img" aria-label="wave">👋</span></p>
      <p className="subline">Please select an option below to proceed:</p>
      <div className="auth-options">
        <div className="button-group">
          <h2>New users:</h2>
          <Link to="/signup" className="auth-link">SIGN UP</Link>
        </div>
        <div className="button-group">
          <h2>Returning users:</h2>
          <Link to="/login" className="auth-link">LOG IN</Link>
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default AuthPage;