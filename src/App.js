// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from "./pages/LoginPage.jsx";
import MyPage from './pages/MyPage';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterUser />} />
          <Route path="/mypage" element={<MyPage />} />

          <Route path="*" element={<div> 404입니다 </div>} />
        </Routes>
      
    </div>
  );
}

export default App;
