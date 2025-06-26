import { createContext, useReducer } from "react";
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
else if(action.type === "ADD_POST"){
    newPostList = [ action.payload,...currPostList];
}
    return newPostList; 
}

const PostListProvider=({children})=>{

    const [postList,dispatchPostList] = useReducer(postListReducer,DEFAULT_POST_LIST);

    const addPost=(userId, postTitle, postBody, reactions, tags)=>{

            console.log(`${userId}, ${postTitle}, ${postBody}, ${reactions}, ${tags}`);

            dispatchPostList({
                type: "ADD_POST",
                payload: {
                 
                        id: Math.random().toString(),
                        title: postTitle,
                        body: postBody,
                        reaction: reactions,
                        userId: userId,
                        tags: tags
                }
            })

        
    }

    const deletePost=(postId)=>{
         dispatchPostList({
            type:"DELETE_POST",
            payload:{postId}
         })
    }

    return (
        <PostList.Provider value={{postList:postList,addPost:addPost,deletePost:deletePost}}>
            {children}
        </PostList.Provider>
    );
};

const DEFAULT_POST_LIST = [
    { id :'1',
        title: 'Going to Mumbai',
        body:'hello, I am going to Mumbai for a business trip',
        reaction:2,
        userId:'user-9',
        tags:['vaction', 'business'],
    },
    {
         id :'2',
        title: 'hello world',
        body:'hey, this is my first post',
        reaction:15,
        userId:'user-12',
        tags:['abbb', 'cdd'],
    }
]

export default PostListProvider;