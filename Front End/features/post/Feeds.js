import React, { useEffect, useState } from "react";
import './feeds.css'
import Feed from './Feed'
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getPosts } from "./postSlice";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getUser } from "../user/userSlice";


export default function Feeds({userId}) {
  const dispatch = useDispatch();
  // const selectedUser = useSelector(state => state.user.selectedUser);

  const [page, setPage] = useState(1);
  const { currentPagePosts, postsById, isLoading, totalPosts } = useSelector(
    (state) => state.post
  );
  const posts = currentPagePosts.map((postId) => postsById[postId]);


  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [dispatch, userId, page]);


  return (
    <div className="feeds">
      {posts.map((post) => (
        <Feed key={post._id} post={post} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom:"3%"}}>
      {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPosts) && posts.length >= totalPosts}
          >
            Load more
          </LoadingButton>
        ) : (
            <Typography variant="h6" sx={{ margin: 3, color: "var(--color-soft)" }}>No Post Yet</Typography>
        )}
      </Box>
    </div>
    
  )
}
