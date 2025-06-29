export default function Posts({ posts, onDeletePost, onEditClick }) {
  return (
    <div>
      <h2 className="text-xl font-bold my-2">All Posts</h2>
      <div>
        <ul className="">
          {posts.map((post) => (
            <li className="my-2 flex" key={post.id}>
              <span className="font-medium">{post.id}</span>
              {"."} <span className="mx-1">{post.title}</span>
              <div>
                <span onClick={() => onDeletePost(post.id)}>❌</span>
                <span onClick={() => onEditClick(post)}>✏️</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
