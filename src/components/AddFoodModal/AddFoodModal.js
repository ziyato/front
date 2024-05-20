import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './AddFoodModal.css';

const AddFoodModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 데이터를 처리합니다.
    console.log({ name, calories });
    onClose(); // 모달 닫기
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>식품 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>식품 이름:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>칼로리:</label>
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
        </div>
        <button type="submit">등록</button>
      </form>
    </Modal>
  );
};

export default AddFoodModal;
