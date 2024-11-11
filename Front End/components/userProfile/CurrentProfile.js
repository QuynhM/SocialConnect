import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faUserGroup, faAddressCard, faUserPlus, faFeed } from '@fortawesome/free-solid-svg-icons';
import useAuth from "../../hooks/useAuth";
import Feeds from '../../features/post/Feeds';
import './userProfile.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Posts from '../../features/post/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../features/user/userSlice';

export default function UserProfile() {
    const { user } = useAuth(); 
    const { userId } = useParams(); 
    const dispatch = useDispatch();
    const selectedUser = useSelector(state => state.user.selectedUser);
    const isCurrentUser = user?._id === userId;
    const [isFollowed, setIsFollowed] = useState(false);

    const toggleFollow = () => {
        setIsFollowed(!isFollowed);
    };

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    useEffect(() => {
        if (userId) {
            dispatch(getUser(userId));
        }
    }, [dispatch, userId]);    


    return (
        <>

            <div className='userProfile'>
                <div className="cover-photos">
                    {selectedUser?.coverUrl ? 
                        (<img src={selectedUser?.coverUrl} alt="" />) 
                        : (<img src="https://www.colorhexa.com/6c63ff.png" alt="Default Cover" />) 
                    }   
                </div>
                <div className="profile-info">
                    <img src={selectedUser?.avatarUrl} alt={selectedUser?.name} />
                    <div className="user-name">
                        <h3>{selectedUser?.name}</h3>
                        <h5>{selectedUser?.email}</h5>                     
                    </div>
                    <div className="profile-button">
                        {isCurrentUser ? (
                            <>
                                <button className="btn btn-primary" onClick={() => handleNavigate(`/user/${user._id}/posts`)}>
                                <FontAwesomeIcon icon={faCameraRetro} />
                                <span> Posts</span>
                            </button>
                            <button className="btn btn-primary" onClick={() => handleNavigate(`/user/${user._id}/friends`)}>
                                <FontAwesomeIcon icon={faUserGroup} />
                                <span> Friends List</span>
                            </button>
                            <button className="btn btn-primary" onClick={() => handleNavigate(`/user/${user._id}/requests`)}>
                                <FontAwesomeIcon icon={faAddressCard} />
                                <span> Friend Requests</span>
                            </button>
                            <button className="btn btn-primary" onClick={() => handleNavigate(`/user/${user._id}/sent`)}>
                                <FontAwesomeIcon icon={faUserPlus} />
                                <span> Requests Sent</span>
                            </button>
                            </>
                        ) : (
                            <button className='btn btn-primary' onClick={toggleFollow}>
                                <FontAwesomeIcon icon={faFeed} /> 
                                {isFollowed ? " Unfollow" : " Follow"}
                            </button>
                        )}
                    </div>
                    <p className="bio">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi alias libero consequatur eius expedita impedit?
                    </p>
                </div>
            </div>
            {isCurrentUser ? (<Outlet />) : (<Feeds userId={selectedUser}/>)}
            
        </>
    );
}
