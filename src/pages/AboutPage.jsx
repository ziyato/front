import React, { useState } from 'react';
import './AboutPage.css';
import ToastModal from '../components/ToastModal/ToastModal';

const AboutPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="about-page">
      <h2>About 페이지</h2>
      <p>이 페이지는 우리의 회사 또는 프로젝트에 대한 간단한 소개를 제공합니다.</p>
      <button onClick={openModal}>식품 추가</button>
      <ToastModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AboutPage;
