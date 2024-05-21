import React from 'react';
import PropTypes from 'prop-types';
import './NoticeModal.css';

const NoticeModal = ({ notifications, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <div className="modal-header">
          <h2>알림 목록</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="modal-content">
          {notifications.map((notification, index) => (
            <div key={index} className="notification">
              {notification}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

NoticeModal.propTypes = {
  notifications: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NoticeModal;
