import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { PostList } from "../store/post-list-store.jsx";
const Post=({post})=>{
 const{deletePost}=useContext(PostList);

    return (
    <div className="card post-card" style={{width: "30rem"}}>
 <div className="card-body">
    <h5 className="card-title">{post.title}
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      onClick={()=>deletePost(post.id)}>
    <MdDelete />
</span>
    </h5>
    <p className="card-text">{post.body}</p>
    {post.tags.map((tag)=>(<span key={tag} className="badge text-bg-primary  hastag">{tag}</span>))}
  </div>
  <div class="alert alert-success reactions" role="alert">
this post is reactioned by {post.reaction}poeple</div>
  </div>
);
}
export default Post;