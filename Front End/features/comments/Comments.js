import './comment.css'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

// Facke Api..............
import CommetData from '../../FackApis/CommetData'

export default function Comments({postId}) {
  return (
    <div className='comments'>
        <CommentForm postId={postId}/>
      
        <CommentList postId={postId}/>
    </div>
  )
}
