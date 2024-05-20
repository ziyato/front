// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MyPage from './pages/MyPage';
import Header from './components/Header';
import './App.css';
import RegisterUser from './pages/RegisterUser.js';
import Login from './pages/Login.js';

function UseLocalStorage(key, initialState) {
  const [state, setState] = useState(() => {
    console.log(window.localStorage.getItem(key));
    let storedValue = window.localStorage.getItem(key);
    return storedValue !== undefined ? JSON.parse(storedValue) : initialState;
  });

  return [state, setState];
}

function App() {
  const [user, setUser] = UseLocalStorage("user");
  return (
    <div className="App">
      
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<RegisterUser />} />
          <Route path="/mypage" element={<MyPage />} />

          <Route path="*" element={<div> 404입니다 </div>} />
        </Routes>
      
    </div>
  );
}

export default App;
