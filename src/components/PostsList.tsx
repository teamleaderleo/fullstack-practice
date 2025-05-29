import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostsList() {
  // State to hold the posts, loading status, and error message
  const [posts, setPosts] = useState<Post[]>([]); // Initialize posts as an empty array
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [error, setError] = useState<string | null> (null); // Initialize error as null

  // Fetch posts from the API when the component mounts
  useEffect(() => { // Use useEffect to fetch data on component mount
    fetch("https://jsonplaceholder.typicode.com/posts") // Fetch posts from the API
      .then((response) => { // Check if the response is ok
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => { // Parse the JSON data
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => { // Handle any errors that occur during the fetch
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Render the posts or loading/error messages
  if (loading) return <div>Loading</div>
  if (error) return <div>Error: {error}</div>

  // Display the list of posts
  return (
    <ul>
      {posts.slice(0, 10).map((post) => (
        <li key={post.id}>
          <strong>{post.title}</strong>
          <br />
          {post.body}
        </li>
      ))}
    </ul>
  );
}