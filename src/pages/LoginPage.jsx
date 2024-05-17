// LoginPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';


const LoginPage = () => {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <Link to="/">홈페이지로 이동</Link>
      <br />
      <Link to="/about">About 페이지로 이동</Link>
      <br />
      <Link to="/my-page">나의 페이지로 이동</Link>
    </div>
  );
};

export default LoginPage;
