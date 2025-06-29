import { useEffect, useState } from "react";
import api from "./api/api";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import Posts from "./components/Posts";

export default function App() {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Create/post
  const handleAddPost = async (newPost) => {
    try {
      const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;

      const finalPost = {
        id: id.toString(),
        ...newPost,
      };

      const response = await api.post("/posts", finalPost);

      setPosts([...posts, response.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete
  const handleDeletePost = async (postId) => {
    if (confirm("Are you sure you want to delete the post?")) {
      try {
        await api.delete(`/posts/${postId}`);
        const newPosts = posts.filter((post) => post.id !== postId);
        setPosts(newPosts);
      } catch (error) {
        setError(error.message);
      }
    } else {
      console.log("You chose not to delete the post!");
    }
  };

  // Update/patch
  const handleEditPost = async (updatedPost) => {
    try {
      const response = await api.patch(`/posts/${updatedPost.id}`, updatedPost);

      const updatedPosts = posts.map((post) =>
        post.id === response.data.id ? response.data : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      setError(error.message);
    }
  };

  // Read/get
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        if (response && response.data) {
          setPosts(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="mx-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">API Request with api</h1>
        <hr />
        <div>
          <Posts
            posts={posts}
            onDeletePost={handleDeletePost}
            onEditClick={setPost}
          />
          <>
            <hr />
            {!post ? (
              <AddPost onAddPost={handleAddPost} />
            ) : (
              <EditPost post={post} onEditPost={handleEditPost} />
            )}
            {error && (
              <>
                <hr />
                <div className="error">{error}</div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
