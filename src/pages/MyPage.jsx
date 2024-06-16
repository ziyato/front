import React, { useState } from "react";
import "./MyPage.css"; // CSS 파일 import
import noImage from "../assets/noImage.jpeg";
import CompleteModal from "../components/CompleteModal/CompleteModal.jsx";

const MyPage = ({ user }) => {
  // 알림 설정 상태
  const [notificationOn, setNotificationOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(user.alert_date || "");
  const [nickname, setNickname] = useState("");
  const [photoURL, setPhotoURL] = useState(""); // 프로필 사진 상태 추가
  const [userData, setUserData] = useState({}); // 사용자 정보 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCancel = () => {
    window.location.href = "/"; // 홈페이지로 이동
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
    console.log(selectedDate)
  };

  const handleSave = () => {
    // 저장 로직
    setSuccessMessage("저장이 완료되었습니다.");
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false); 
    }, 1000);
  };

  return (
    <>
    <div className="my-page-container">
      {/* 위에 있는 행 (left-section과 right-section) */}
      <div className="flex">
        {/* 왼쪽 섹션 */}
        <div className="left-section">
          <div className="user-photo">
            <img
              src={user.profile_pic || photoURL || noImage}
              alt="프로필 사진"
            />
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="file-input"
            onChange={handlePhotoUpload}
          />
          <button
            className="change-photo-btn"
            onClick={() => document.querySelector(".file-input").click()}
          >
            파일 선택
          </button>
        </div>

        {/* 오른쪽 섹션 */}
        <div className="right-section">
          <div className="flex flex-col items-center space-y-20">
            {" "}
            {/* 수정된 부분 */}
            {/* 사용자 정보 세로로 표시 */}
            <h1 className="text-3xl w-full font-bold border-b-2 border-slate-300 pb-5 mb-5">
              내 정보
            </h1>
            {/* 내 정보와 이름 사이에 가느다란 긴 회색 가로줄 추가 */}
            <div className="flex flex-col gap-4">
              <InputForm
                title="이름"
                name="username"
                inputValue={user.username}
                // handleChange={handleInputChange}
              />
              <InputForm
                title="아이디"
                name="email"
                // handleChange={handleInputFrameworkChange}
                inputValue={user.email}
                
              />
              <InputForm
                title="비밀번호 수정"
                name="password"
                type="password"
                // handleChange={setInputEtcChange}
                // inputValue={inputEtc}
              />
              <InputForm
                title="비밀번호 확인"
                name="password"
                type="password"
                // handleChange={setInputEtcChange}
                // inputValue={inputEtc}
              />
              <InputForm
                title="가입 일자"
                name="password"
                // handleChange={setInputEtcChange}
                inputValue={user.join_date.slice(0, 10)}
                isReadOnly={true}
              />

              {/* <div className="flex items-center gap-2">
                <InputForm
                  title="닉네임"
                  name="nickname"
                  handleChange={(e) => setNickname(e.target.value)}
                  inputValue={nickname}
                />
              </div> */}
            </div>
            <div className="flex justify-end w-full">
              {/* 수정된 부분 */}
              <button
                className="cancel-button mr-2 w-16 h-10"
                onClick={handleCancel}
              >
                취소
              </button>
              <button 
              className="save-button w-16 h-10"
              onClick={handleSave}>저장</button>
            </div>
          </div>
        </div>
      </div>

      {/* 회색 가로선으로 구분 */}
      <hr className="border-t border-gray-300 my-10" />
      {/* 아래에 있는 행 (알림 설정) */}
      <div className="flex flex-col items-center notification-settings">
        {/* 수정된 부분 */}
        <h2 className="text-xl font-bold mr-5">알림 설정</h2>
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
            <label htmlFor="notification-date" className="date-select-label">
              알림 기준 일자
            </label>
            <select
              id="notification-date"
              className="date-select-box"
              value={selectedDate}
              onChange={handleDateChange}
            >
              <option value="">선택하세요</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}일
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
    {/* 모달창 */}
    <CompleteModal
    isModalOpen={isModalOpen}
    message={successMessage}
    onClose={() => setIsModalOpen(false)} 
    />
  </>
  );
};

function InputForm({
  title,
  name,
  handleChange,
  inputValue,
  type = "text",
  isReadOnly = false,
}) {
  // type = type || "text";
  return (
    <div className="mt-2 flex place-items-center">
      <div className="min-w-32 text-right pr-5">{title}</div>
      <input
        type={type}
        name={name}
        className="block w-full max-w-xs h-9 rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 leading-6"
        onChange={handleChange}
        value={inputValue}
        readOnly={isReadOnly}
      />
    </div>
  );
}

export default MyPage;
