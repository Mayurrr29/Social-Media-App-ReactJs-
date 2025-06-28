import { act, createContext, useEffect,useReducer } from "react";
export const PostList = createContext({
    postList:[],
    addPost:()=>{},
    deletePost:()=>{},
});

const postListReducer = (currPostList, action) => {
    let newPostList=currPostList;
if(action.type === "DELETE_POST"){
    newPostList=currPostList.filter(post=>post.id!==action.payload.postId);
}
else if(action.type === "ADD_INITIAL_POST"){
    newPostList=action.payload.posts;
}
else if(action.type === "ADD_POST"){
    newPostList = [ action.payload,...currPostList];
}
    return newPostList; 
}

const PostListProvider=({children})=>{

    const [postList,dispatchPostList] = useReducer(postListReducer, []);


const addInitialPost=(posts)=>{
            dispatchPostList({
                type: "ADD_INITIAL_POST",
                payload: {
                posts
                }
            })
        
    };
    const addPost=(post)=>{

            dispatchPostList({
                type: "ADD_POST",
                payload: post,
            })

        
    }

    const deletePost=(postId)=>{
         dispatchPostList({
            type:"DELETE_POST",
            payload:{postId}
         })
    }

    useEffect(()=>{
        fetch("https://dummyjson.com/posts")
       .then((res)=>res.json())
       .then(data=>{addInitialPost(data.posts)});
    },[])
    return (
        <PostList.Provider value={{postList:postList,addPost:addPost,deletePost:deletePost}}>
            {children}
        </PostList.Provider>
    );
};



export default PostListProvider;