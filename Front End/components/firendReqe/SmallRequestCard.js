import React from 'react'
import ActionButton from "../../features/friend/ActionButton";
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom'


function SmallRequestCard({profile}) {
    const { user } = useAuth();
    const currentUserId = user._id;
    const { _id: targetUserId, name, avatarUrl, email, friendship } = user;

    const actionButton = (
        <ActionButton
          currentUserId={currentUserId}
          targetUserId={targetUserId}
          friendship={friendship}
        />
      );
  return (
    <div className="request">
        <Link to={`/users/${targetUserId}`}> 
            <div className="info" key={profile._id}>
            <div className="user">
            <img src={avatarUrl} alt={name} />
            <h5>{name}</h5>
            </div>
            </div>
        </Link>

        <div className="action">
            <button className='btn btn-primary'>Accept</button>
            <button className='btn btn-red'>Delete</button>
        </div>
        {actionButton}
    </div>          
  )
}

export default SmallRequestCard
