import './nav.css'
import { Link } from 'react-router-dom'
import { useNavigate, Link as RouterLink } from "react-router-dom";
import * as React from "react";
import useAuth from "../../hooks/useAuth";
import { Avatar, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faEnvelope, faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import Logo from '../logo/Logo'
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput";
import DarkMoode from '../darkmod/DarkMoode'
import { getUsers } from '../../features/user/userSlice';


export default function Nav() {
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

  const handleSubmit = (searchQuery) => {
    console.log("searchQuery", searchQuery)
    navigate(`/search?name=${searchQuery}`);
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
        to="/user/me"
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
    <nav>
      <div className="nav-container">

  {/* ..................NavAria Left ................*/}
        <div className="nav-left">
          <Link to='/'>
            <Logo/>
          </Link>   
          <div className="Nav-Serchbar" >
            {/* <FontAwesomeIcon icon={faSearch} />
            <input type="search" /> */}
            <SearchInput handleSubmit={handleSubmit} />
          </div>    
        </div>

  {/* ..................NavAria Right ................*/}
        <div className="nav-right">
          <Link to='/' >
            <FontAwesomeIcon icon={faBell} />            
          </Link>
          
          <DarkMoode />
                 
          <div >
            <Box sx={{ flexGrow: 1 }} />
              <Box>
                <Avatar
                  onClick={handleProfileMenuOpen}
                  src={user.avatarUrl}
                  alt={user.name}
                  sx={{ width: 40, height: 40 }}
                />
            </Box>
            {renderMenu}   
          </div>     
                   
        </div>


      </div>
    </nav>
  )
}
