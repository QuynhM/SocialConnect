import '../Style.css';
// import './MainHeader.css';
import Logo from '../components/Logo';
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Divider } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Search} from "@mui/icons-material";


function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/welcome");
      });
    } catch (error) {
      console.error(error);
    }
  };


  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        My Profile
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <nav>
      <div class="container nav-container ">
        {/* <div className="topbarLeft"> */}
          <Logo />
          <div class="serch-bar">
             <input type="search" placeholder="Serch For Connection" />
          </div>
          {/* <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for Connection"
              className="searchInput"
            />
          </div> */}
        {/* </div> */}
          <div class="add-post">
              <Box sx={{ flexGrow: 1 }} />
                <Box>
                  <Avatar
                    onClick={handleProfileMenuOpen}
                    // src={user.avatarUrl}
                    src="https://static.vecteezy.com/system/resources/previews/013/431/434/large_2x/cute-dog-mascot-cartoon-logo-design-flat-design-style-vector.jpg"
                    alt={user.name}
                    sx={{ width: 40, height: 40 }}
                  />
              </Box>
              {renderMenu}
          </div>
      </div>
  </nav>  
</Box>
   
  )
}

export default MainHeader