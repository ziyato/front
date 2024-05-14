// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import NavigationBar from './components/NavigationBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="flex"> header</div>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-page" element={<MyPage />} />

          <Route path="*" element={<div> 404입니다 </div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
