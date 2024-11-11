import React from 'react';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

function BookMarks({ onClick, isActive }) {
  return (
    <button className={`menu-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <BookmarksIcon className="icon" />
      <h3>Book Marks</h3>
    </button>
  );
}

export default BookMarks;
