import React, { useState } from 'react';
import './ToastModal.css';

const ToastModal = ({ isOpen, onClose }) => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ foodName, quantity, manufacturingDate, expiryDate, category });
    onClose();
  };

  return (
    isOpen && (
      <div className="toast-modal-overlay" onClick={onClose}>
        <div className="toast-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>닫기</button>
          <h2>식품 등록</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>음식 이름:</label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>수량:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>제조일자:</label>
              <input
                type="date"
                value={manufacturingDate}
                onChange={(e) => setManufacturingDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>유통기한:</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>카테고리:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={onClose}>취소</button>
              <button type="submit">완료</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ToastModal;
