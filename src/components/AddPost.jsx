import { useState } from "react";

export default function AddPost({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      body,
    };
    onAddPost(newPost);

    // reset form
    setTitle("");
    setBody("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold my-2">Add new post</h2>

      <form onSubmit={handleSubmit}>
        <p className="mb-2">
          <input
            className="border-1 p-1"
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>

        <p>
          <input
            className="border-1 p-1"
            type="text"
            placeholder="Post body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </p>

        <div>
          <input className="font-bold text-xl mt-1" type="submit" />
        </div>
      </form>
    </div>
  );
}
