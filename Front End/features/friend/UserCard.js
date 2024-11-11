import React from "react";
import { Avatar, Box, Card, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

import useAuth from "../../hooks/useAuth";
import ActionButton from "./ActionButton";

function UserCard({ profile }) {
  const { user } = useAuth();
  const currentUserId = user._id;
  const { _id: targetUserId, name, avatarUrl, email, friendship } = profile;

  const actionButton = (
    <ActionButton
      currentUserId={currentUserId}
      targetUserId={targetUserId}
      friendship={friendship}
    />
  );
  

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3, flexDirection: "column" }}>
        <Link
          variant="subtitle2"
          component={RouterLink}
          to={`/user/${targetUserId}`}
        >
        <img src={avatarUrl} alt={name} style={{ width: "" }} />
        </Link>
        <Box sx={{ display: "flex", alignItems: "center" }}>
        
          <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }} noWrap>
            {name}
          </Typography>
        </Box>
      {/* </Box> */}
      {actionButton}
    </Card>
    
  );
}

export default UserCard;
