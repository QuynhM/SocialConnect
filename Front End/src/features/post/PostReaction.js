import { IconButton, Stack, Typography } from "@mui/material";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendPostReaction } from "./postSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faListDots, faShare } from '@fortawesome/free-solid-svg-icons'
import CircularProgress from '@mui/material/CircularProgress';


function PostReaction({ post }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.reactions.like);

  useEffect(() => {
    if (post) {
        setLiked(post?.reactions.isLiked);
        setLikeCount(post?.reactions.like);
    }
}, [post]);


  const handleClick = async () => {
    console.log("likedState", liked)
    console.log("likedCount", likeCount)

    const newLikedState = !liked;
    const newLikeCount = newLikedState ? likeCount + 1 : Math.max(likeCount - 1, 0);

    console.log("newLikedState", newLikedState)

    // Optimistically update UI
    setLiked(newLikedState);
    setLikeCount(newLikeCount);
    try {
      await dispatch(sendPostReaction({
        postId: post._id,
        emoji: "like",
        isLiked: newLikedState
      }));
    } catch (error) {
      // If there's an error, revert to the previous state
      setLiked(!newLikedState);
      setLikeCount(newLikedState ? likeCount - 1 : likeCount + 1);
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <span>
      <FontAwesomeIcon
          icon={faHeart}
          onClick={handleClick}
          style={{ color: liked ? 'red' : 'var(--text-color)' }}
        /> {likeCount} Like
    </span>
  );
}

export default PostReaction;
