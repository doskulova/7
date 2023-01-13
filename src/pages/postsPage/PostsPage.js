import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPosts, postsDelete} from "../../store/postsSlice";
import Post from "../../components/post/Post";

function PostsPage() {
  const  dispatch = useDispatch()
    const {posts, preloader, error, post} = useSelector(state => state.postsReducer)
    const deleteAll = () => {
      dispatch(postsDelete())
    }
    const getPostsUi = () => {
      dispatch(getPosts())
    }
    useEffect(()=>{
        dispatch(getPosts())
    }, [])
    return (
        <>
            <button onClick={getPostsUi}>get posts</button>
            <button onClick={deleteAll}>delete all</button>
            <ul>
                <li>{post.title}</li>
                <li>{post.body}</li>
            </ul>


            {
                preloader
                    ?
                    <h4>loading...</h4>
                    :
                    error
                    ?
                        <h4>{error}</h4>
                        :
                posts.map(post => <Post key={post.id} postInfo={post}/>)
            }
        </>
    );
}

export default PostsPage;