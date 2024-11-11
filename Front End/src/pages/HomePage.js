import Feeds from "../features/post/Feeds";
import PostForm from "../features/post/PostForm";
import useAuth from "../hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  return (
    <>
    <br></br>
    <PostForm />
    <Feeds userId={user}/>
    </>
  )
}

