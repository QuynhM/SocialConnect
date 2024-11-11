import { Link } from 'react-router-dom'
import './leftBar.css'

// Components.............
import CurrentUser from '../../FackApis/CurrentUserData'


// Icon Image...........
import Firend from '../../assets/icon/1.png'
import  Groups from '../../assets/icon/2.png'
import  Market from '../../assets/icon/3.png'
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import useAuth from "../../hooks/useAuth";

export default function LeftBar() {
  const { user, logout } = useAuth();
  return (
    <div className='leftBar'>
      <div className="left-container">
        <div className="menu">

          <Link to={`/user/${user._id}/posts`}>
            <div className="user">
              <img src={user?.avatarUrl} alt="" />
              <div className="profile-handle">
                <h4>{user?.name}</h4>
                <p className="text-gry">
                  {user?.email}
                </p>  
              </div>
            </div>
          </Link>

          <hr />   

          <h4 className='others'>Your Shortcuts</h4>

          <Link to={`/user/${user._id}/friends`}>
            <div className="item">
              {/* <img src={Firend} alt="" /> */}
              <PeopleAltIcon className='icon'/>
              <h4>Firends List</h4>
            </div>
          </Link>

          <Link to='/'>
            <div className="item">
              {/* <img src={Market} alt="" /> */}
              <NotificationsActiveIcon className='icon' />
              <h4>Notifications</h4>
            </div>
          </Link>


        </div>

     
{/*           
        <div className="menu">
          <h4 className='others'>Your Shortcuts</h4>

          <Link to='/'>
            <div className="item">
              <img src={Gallery} alt="" />
              <h4>Gallery</h4>
            </div>
          </Link>

          <Link to='/'>
            <div className="item">
              <img src={Videos} alt="" />
              <h4>Videos</h4>
            </div>
          </Link>

          <Link to='/chatbox/id'>
            <div className="item">
              <img src={Message} alt="" />
              <h4>Message</h4>
            </div>
          </Link>

        </div> */}
      </div>
    </div>
  )
}
