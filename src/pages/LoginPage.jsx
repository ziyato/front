// LoginPage.jsx

import React, { useState } from 'react';

const LoginPage = () => {
  // 상태 변수 선언
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 로그인 처리 함수
  const handleLogin = (event) => {
    event.preventDefault();

    // 간단한 예제를 위해 username이 "admin"이고 password가 "password"인 경우에만 로그인 성공으로 간주합니다.
    if (username === 'admin' && password === 'password') {
      // 로그인 성공
      console.log('로그인 성공!');
      setError('');
      // 여기에 로그인 후 처리 로직 추가
    } else {
      // 로그인 실패
      setError('유효하지 않은 사용자 이름 또는 비밀번호입니다.');
    }
  };

  return (
    <div>
      <h2>로그인 페이지</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>사용자 이름:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
