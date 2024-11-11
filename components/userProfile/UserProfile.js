import React, { useState,useEffect } from 'react';
import './userProfile.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeed, faLink, faMessage } from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Feeds from '../../features/post/Feeds';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUser } from "../../features/user/userSlice";


export default function UserProfile() {
    const { user } = useAuth();
    const params = useParams();
    const userId = params.userId;
    // State to track whether the user is followed or not
    const [isFollowed, setIsFollowed] = useState(false);

    // Function to toggle the follow state
    const toggleFollow = () => {
        setIsFollowed(!isFollowed);
    };

    const dispatch = useDispatch();
    const { selectedUser, isLoading } = useSelector(
      (state) => state.user,
      shallowEqual
    );
  
    useEffect(() => {
      if (userId) {
        dispatch(getUser(userId));
      }
    }, [dispatch, userId]);

  return (
    <>
        <div className='userProfile'>
            <div className="cover-photos">
                {user?.coverUrl ? 
                    (<img src={selectedUser?.coverUrl} alt="" />) 
                    : (<img src="https://www.colorhexa.com/6c63ff.png" alt="" />) 
                }   
            </div>
            <div className="profile-info">
                <img src={selectedUser?.avatarUrl} alt="" />
                <div className="user-name">
                    <h3>{selectedUser?.name}</h3>
                    <h5>{selectedUser?.email}</h5>
                </div>
                <div className="profile-button">
                    <button className='btn btn-primary' onClick={toggleFollow}>
                        <FontAwesomeIcon icon={faFeed} /> 
                        {isFollowed ? " Waiting for connection" : " Follow"}
                    </button>
                </div>
                <p className="bio">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi alias libero consequatur eius expedita impedit?
                </p>
            </div>
        </div>
    <Feeds/>
    </>
  )
}
