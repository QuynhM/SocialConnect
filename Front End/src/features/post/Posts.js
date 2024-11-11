import React from 'react'
import Feeds from './Feeds'
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PostForm from '../../features/post/PostForm';


function Posts({userId}) {
    // const { userId } = useParams();
    // const { user } = useAuth();

    return (
        <div>
            <PostForm />
            <Feeds userId={userId}/>
        </div>
    )
}

export default Posts
