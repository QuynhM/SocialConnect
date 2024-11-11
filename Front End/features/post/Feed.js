import './feeds.css'
import Comments from '../comments/Comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faListDots, faShare } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from "react";
import { deletePost, editPost, getPosts } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Link,
    Card,
    Stack,
    Avatar,
    Typography,
    CardHeader,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import { Link as RouterLink } from "react-router-dom";
import PostEdit from './PostEdit';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from './PostReaction';
import { sendPostReaction } from "./postSlice";

export default function Feed({post}) {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [likesCount, setLikesCount] = useState(post?.reactions?.like);
    const [commentsCount, setCommentsCount] = useState(post?.commentCount);
  
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleEditPost = () => {
      // dispatch(editPost(post._id));
      console.log();
    };
  
    const handleDeletePost = () => {
      setConfirmationDialogOpen(true);
    };
  
    const handleConfirmDelete = () => {
      dispatch(deletePost(post._id));
      setConfirmationDialogOpen(false);
    };
  
    const handleCancelDelete = () => {
      setConfirmationDialogOpen(false);
    };
  
    // console.log("POST:", post);

    let [openComment, setOpenComment] = useState(false);
    const CommentHandeler =()=>{
        setOpenComment(!openComment)
    }

    const handleClick = () => {
      const newLikedState = !liked;
      setLiked(newLikedState);  // Toggle the liked state
      setLikesCount(prevLikes => newLikedState ? prevLikes + 1 : Math.max(prevLikes - 1, 0));  // Update likes count based on new liked state
  
      dispatch(sendPostReaction({
          postId: post._id,
          emoji: "like",
          isLiked: newLikedState
      })).catch((error) => {
          // Rollback on error
          setLiked(!newLikedState);
          setLikesCount(prevLikes => newLikedState ? prevLikes - 1 : prevLikes + 1);
          console.error("Failed to toggle like:", error);
      });
  };
  
  
  const handleNewComment = () => {
    setCommentsCount(prev => prev + 1); // Increment comment count
  };

  useEffect(() => {
    setLikesCount(post?.reactions?.like);
    setCommentsCount(post?.commentCount);
  }, [post]);

    return (
       <div className='feed'>
          <CardHeader
            disableTypography
            avatar={
              <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
            }
            title={
              <Link
                variant="subtitle2"
                color="text.primary"
                component={RouterLink}
                sx={{ fontWeight: 600 }}
                to={`/user/${post.author._id}`}
              >
                <h5>{post?.author?.name}</h5>
              </Link>
            }
            subheader={
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.secondary" }}
              >
                {fDate(post.createdAt)}
              </Typography>
            }
            action={
              <>
                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon style={{ fontSize: "20px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleEditPost}>
                    <PostEdit postId={post._id} postContent={post.content} />
                  </MenuItem>
                  <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                </Menu>
              </>
            }
          />

      <Stack spacing={2} sx={{ p: 3 }}>
        <div className="mid-content">
            <p className="action-item">{post.content}</p>
            {post.image &&
            (<img src={post.image} alt="" />)}
        </div>
        <div className="bottom-content">
            <div className="action-item">
                {/* <span> */}
                {/* <FontAwesomeIcon
                    icon={faHeart}
                    onClick={handleClick}
                    // style={{ color: liked ? 'red' : 'var(--text-color)' }}
                  /> {likesCount} Like</span> */}
                   <PostReaction post={post} />
            </div>
            <div className="action-item" onClick={CommentHandeler}>
                <span><FontAwesomeIcon icon={faComment} /> {commentsCount} Comment</span>
            </div>
            {/* <div className="action-item">
                <span><FontAwesomeIcon icon={faShare} /> 1 Share</span>
            </div> */}
        </div>
        {openComment && <Comments postId={post._id} onNewComment={handleNewComment}/>}
        </Stack>
        
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
            <Button onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
 
    </div>
    )
}
