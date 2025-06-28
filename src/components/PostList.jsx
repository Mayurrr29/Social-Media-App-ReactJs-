import Post from './Post.jsx';
import {useContext, useEffect, useState} from 'react';
import {PostList as PostListData} from '../store/post-list-store.jsx';
import WelcomeMessage from '../WelcomeMessage.jsx';
const PostList=()=>{

    const{postList}=useContext(PostListData);

    return(
        <> 

        {postList.length===0 && <WelcomeMessage />}
            {postList.map((post)=>(<Post key={post.id} post={post}/>))}
       
        </>
    );
}
export default PostList;