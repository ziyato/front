// NavigationBar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">홈페이지</Link></li>
        <li><Link to="/about">About 페이지</Link></li>
        <li><Link to="/login">로그인</Link></li>
        <li><Link to="/my-page">나의 페이지</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
