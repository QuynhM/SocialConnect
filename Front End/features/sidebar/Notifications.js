import React from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Notifications({ onClick, isActive }) {
  return (
    <button className={`menu-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <NotificationsActiveIcon className="icon"/>
      <h3>Notifications</h3>
    </button>
  );
}

export default Notifications;
