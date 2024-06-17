import React from 'react';
import PropTypes from 'prop-types';
import './NoticeModal.css';

const NoticeModal = ({ notifications, onClose }) => {
  const calculateDaysRemaining = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return diffDays;
  };

  const getExpirationStatus = (expirationDate) => {
    const daysRemaining = calculateDaysRemaining(expirationDate);
    if (daysRemaining < 0) {
      return "유통기한이 지났습니다.";
    } else {
      return `${daysRemaining}일 남음`;
    }
  };

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>알림 목록</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="modal-content">
          {notifications.map((notification) => (
            <div key={notification.food_id} className="notification">
              <p>{notification.food_name}</p>
              <div className="expiration-status">
                <p>유통기한: {notification.expiration_date}</p>
                <p>{getExpirationStatus(notification.expiration_date)}</p>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <p className="empty-notification">유통기한이 지난 음식이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

NoticeModal.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      food_id: PropTypes.number.isRequired,
      food_name: PropTypes.string.isRequired,
      expiration_date: PropTypes.string.isRequired
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NoticeModal;
