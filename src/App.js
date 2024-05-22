// App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MyPage from "./pages/MyPage";
import Header from "./components/Header";
import "./App.css";
import RegisterUser from "./pages/RegisterUser.js";
import Login from "./pages/Login.js";
import FoodDetailPage from "./pages/FoodDetailPage.jsx";

function UseSessionStorage(key) {
  const storedValue = sessionStorage.getItem(key);
  console.log(storedValue);
  return storedValue ? JSON.parse(storedValue) : null;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = UseSessionStorage("user");
    setUser(storedUser);
  }, []);

  return (
    <div className="App">
      <Header user={user} />

      <Routes>
        <Route path="/" element={user ? <HomePage user={user} /> : <Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegisterUser />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/food/:food_id" element={<FoodDetailPage />} />
        <Route path="*" element={<div> 404입니다 </div>} />
      </Routes>
    </div>
  );
}

export default App;



// 유저 정보 예시
const userInfo = {
  user_name: "민지",
  user_id: 4,
  email: "kmjlso1028@naver.com",
  password: "123",
  
  join_date: "2024-05-15T11:38:22.625Z",
  profile_pic: null,
  alert_date: 3,
};