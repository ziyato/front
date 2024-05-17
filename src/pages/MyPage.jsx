import React from 'react';
import './MyPage.css'; // CSS 파일 import

const MyPage = () => {
  // 사용자 정보와 사용자 정보 변경 함수 등을 가져오는 코드

  // 사용자 정보
  const user = {
    // 사용자 정보 객체
    photoURL: '사용자의 프로필 사진 URL',
    username: '사용자명',
    userId: '아이디',
    password: '비밀번호',
    nickname: '닉네임'
    // 나머지 사용자 정보
    // ...
  };

  // 사진 변경 함수
  const handlePhotoUpload = () => {
    // 사진 변경 로직
  };
  return (
    <div className="my-page-container">
      {/* 위에 있는 행 (left-section과 right-section) */}
      <div className="flex">
        {/* 왼쪽 섹션 */}
        <div className="left-section">
          <div className="user-photo">
            <img src={user.photoURL} alt="프로필 사진" />
          </div>
          <button className="change-photo-btn" onClick={handlePhotoUpload}>
            사진 변경
          </button>
        </div>
  
        {/* 오른쪽 섹션 */}
        <div className="right-section">
          <div className="flex flex-col items-start space-y-20">
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
              <InputForm
                title="닉네임"
                name="nickname"
                // handleChange={setInputEtcChange}
                // inputValue={inputEtc}
              />
            </div>
          </div>
        </div>
      </div>
  
      {/* 회색 가로선으로 구분 */}
      <hr className="border-t border-gray-300 my-10" />
  
      {/* 아래에 있는 행 (알림 설정) */}
      <div className="flex justify-center items-center">
        <h2 className="text-xl font-bold mr-5">알림 설정</h2>
        {/* 알림 설정 컴포넌트 추가 */}
        {/* <NotificationSettings /> */}
      </div>
  
      {/* 다른 컨텐츠들 */}
    </div>
  );
}
  
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
