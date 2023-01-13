import React from 'react';
import {useDispatch} from "react-redux";
import {getOnePost} from "../../store/postsSlice";

function Post({postInfo}) {
    const dispatch = useDispatch()
    const getMoreInfo = (event) => {
        dispatch(getOnePost(event.target.value))
    }

    return (
        <>
            <h4>{postInfo.title}</h4>
            <button value={postInfo.id} onClick={getMoreInfo}>more info</button>

        </>


    );
}

export default Post;