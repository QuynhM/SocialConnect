import React, { useState } from "react";
import { Stack, Avatar, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { createComment } from "./commentSlice";

function CommentForm({ postId }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ postId, content }));
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        <Avatar src={user.avatarUrl} alt={user.name} />
        <TextField
          fullWidth
          size="small"
          value={content}
          placeholder="Write a comment…"
          onChange={(event) => setContent(event.target.value)}
          InputProps={{
            style: {
              color: "var(--text-color)"
            },
          }}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: "var(--color-border)",
            },
            "& ::placeholder": {
              color: "var(--text-color)"
            },
          }}
        />
        <button type='submit' className='btn btn-primary'>Send</button>
      </Stack>
    </form>
  );
}

export default CommentForm;
