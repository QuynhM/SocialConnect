import React from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import { useState } from "react";
import { Link } from 'react-router-dom'

function timeElapsedFromDate(date) {
  
  const now = new Date(); // Current date and time
  const elapsedMilliseconds = now - date; // Calculate the difference in milliseconds

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(elapsedMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Determine the appropriate time unit to display
  if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
}


function CommentCard({ comment }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const handleDelete = async () => {
    setConfirmationDialogOpen(true);
  };

  const handleComfirmDelete = () => {
    setIsDeleting(true);
    dispatch(deleteComment({ commentId: comment._id }));
    setConfirmationDialogOpen(false);
  };
  return (
    <div className="comment">
      <Link to={`/user/${comment.author?._id}`}>
          <img alt={comment.author?.name} src={comment.author?.avatarUrl} className="comment_img" />
      </Link>
      
      <div className="comment_col">
        <div className="comment_wrap">
          <div className="comment_name">
          {comment.name}
          </div>
          <div className="comment_text">{comment.content}</div>
        </div>
        
        <div className="comment_actions">
          <span>Like</span>
          <span onClick={handleDelete} disabled={isDeleting}>Delete</span>
          <span>
          {timeElapsedFromDate(new Date(comment.createdAt))}
          </span>
        </div>
      </div>

      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this post?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleComfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CommentCard;
