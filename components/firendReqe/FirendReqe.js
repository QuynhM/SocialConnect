import './firendReqe.css'
import { Link } from 'react-router-dom'
import useAuth from "../../hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequestsSideBar, acceptRequest, declineRequest } from "../../features/friend/friendSlice";
import ActionButton from "../../features/friend/ActionButton";


export default function FirendReqe() {
  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );
  const users = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendRequestsSideBar());
  }, [dispatch]);


  return (
    <div className='Firend-Requests'>
      <h4>Firend Requests</h4>

      {
        users.map(user=>(
          <div className="request">
            <Link to={`/user/${user._id}`}> 
             <div className="info" key={user._id}>
              <div className="user">
                <img src={user.avatarUrl} alt="" />
                <h5>{user.name}</h5>
              </div>
             </div>
            </Link>

            <div className="action">
              <button className='btn btn-primary' onClick={() => dispatch(acceptRequest(user._id))}>Accept</button>
              <button className='btn btn-red' onClick={() => dispatch(declineRequest(user._id))}>Delete</button>
            </div>
          </div>          
        ))
      }
    </div>
  )
}
