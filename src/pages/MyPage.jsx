import React, { useState } from 'react';
import './MyPage.css'; // CSS 파일 import

const MyPage = () => {
  // 알림 설정 상태
  const [notificationOn, setNotificationOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [nickname, setNickname] = useState('');
  const [photoURL, setPhotoURL] = useState(''); // 프로필 사진 상태 추가

  const handleCancel = () => {
    window.location.href = '/'; // 홈페이지로 이동
  };

  // 사용자 정보
  const user = {
    username: '사용자명',
    userId: '아이디',
    password: '비밀번호',
    nickname: '닉네임',
    // 나머지 사용자 정보
    // ...
  };

  // 사진 변경 함수
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result); // 사진을 상태에 저장
      };
      reader.readAsDataURL(file);
    }
  };

  // 알림 설정 변경 함수
  const toggleNotification = () => {
    setNotificationOn((prevState) => !prevState);
  };

  // 알림 기준 일자 변경 함수
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // 닉네임 수정 함수
  const handleNicknameUpdate = () => {
    // 닉네임 수정 로직
  };

  return (
    <div className="my-page-container">
      {/* 위에 있는 행 (left-section과 right-section) */}
      <div className="flex">
        {/* 왼쪽 섹션 */}
        <div className="left-section">
          <div className="user-photo">
            <img src={photoURL} alt="프로필 사진" />
          </div>
          <input 
            type="file" 
            accept="image/jpeg,image/png" 
            className="file-input"
            onChange={handlePhotoUpload} 
          />
          <button className="change-photo-btn" onClick={() => document.querySelector('.file-input').click()}>
            파일 선택
          </button>
        </div>

        {/* 오른쪽 섹션 */}
        <div className="right-section">
          <div className="flex flex-col items-center space-y-20"> {/* 수정된 부분 */}
            {/* 사용자 정보 세로로 표시 */}
            <h1 className="text-3xl w-full font-bold border-b-2 border-slate-300 pb-5 mb-5">내 정보</h1>
            {/* 내 정보와 이름 사이에 가느다란 긴 회색 가로줄 추가 */}
            <div className="flex flex-col gap-4">
              <InputForm
                title="이름"
                name="name"
                // handleChange={handleInputChange}
                // inputValue={inputName}
              />
              <InputForm
                title="아이디"
                name="id"
                // handleChange={handleInputFrameworkChange}
                // inputValue={inputFramework}
              />
              <InputForm
                title="비밀번호"
                name="password"
                // handleChange={setInputEtcChange}
                // inputValue={inputEtc}
              />
              <div className="flex items-center gap-2">
                <InputForm
                  title="닉네임"
                  name="nickname"
                  handleChange={(e) => setNickname(e.target.value)}
                  inputValue={nickname}
                />
              </div>
            </div>
            <div className="flex justify-end w-full"> {/* 수정된 부분 */}
              <button className="cancel-button mr-2" onClick={handleCancel}>취소</button>
              <button className="save-button">저장</button>
            </div>
          </div>
        </div>
      </div>

      {/* 회색 가로선으로 구분 */}
      <hr className="border-t border-gray-300 my-10" />
      {/* 아래에 있는 행 (알림 설정) */}
      <div className="flex flex-col items-center notification-settings"> {/* 수정된 부분 */}
        <h2 className="text-xl font-bold mr-5">알림 설정</h2>
        {/* 스위치와 날짜 선택 박스를 같은 행으로 정렬 */}
        <div className="relative mt-2">
          <input
            type="checkbox"
            id="toggle"
            hidden
            checked={notificationOn}
            onChange={toggleNotification}
          />
          <label htmlFor="toggle" className="toggleSwitch">
            <span className="toggleButton"></span>
          </label>
        </div>
        {notificationOn && (
          <div className="date-select-container">
            <label htmlFor="notification-date" className="date-select-label">알림 기준 일자</label>
            <select
              id="notification-date"
              className="date-select-box"
              value={selectedDate}
              onChange={handleDateChange}
            >
              <option value="">선택하세요</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}일</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 다른 컨텐츠들 */}
    </div>
  );
};

function InputForm({ title, name, handleChange, inputValue }) {
  return (
    <div className="mt-2 flex place-items-center">
      <div className="min-w-32 text-right pr-5">{title}</div>
      <input
        type="text"
        name={name}
        className="block w-1/2 h-9 rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 leading-6"
        onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
}

export default MyPage;