import React from 'react';
import HomeIcon from '@mui/icons-material/Home';

function HomeButton({ onClick, isActive }) {
  return (
    <button className={`menu-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <HomeIcon className="icon"/>
      <h3>Home</h3>
    </button>
  );
}

export default HomeButton;
