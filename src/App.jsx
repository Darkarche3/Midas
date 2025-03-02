import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/loginPage.jsx';
import Home from './pages/Home/homePage.jsx';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;