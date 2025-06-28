import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        title: postTitle,
        body: postBody,
        reaction: reactions,
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then(post=>addPost(post));

    addPost(post);
  };
  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="userId" className="form-label">
          Enter Your user ID
        </label>
        <input
          type="text"
          className="form-control"
          id="userId"
          ref={userIdElement}
          placeholder="Enter Your user ID"
        />
      </div>

      <div className="mb-3">
        <label for="title" className="form-label">
          Post title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          ref={postTitleElement}
          placeholder="How are you feeling today.."
        />
      </div>
      <div className="mb-3">
        <label for="title" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          rows="4"
          className="form-control"
          id="body"
          ref={postBodyElement}
          placeholder="tell us more about your feelings today..."
        />
      </div>

      <div className="mb-3">
        <label for="reactions" className="form-label">
          Nubmer of Reactions
        </label>
        <input
          type="text"
          className="form-control"
          id="reactions"
          ref={reactionsElement}
          placeholder="How may ppl reacted to this post"
        />
      </div>

      <div className="mb-3">
        <label for="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          className="form-control"
          id="tags"
          ref={tagsElement}
          placeholder="please enter your tags here"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default CreatePost;
