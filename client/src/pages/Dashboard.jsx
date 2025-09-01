import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  // ✅ Use environment variable
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch posts
  useEffect(() => {
    axios.get(`${API}/api/users`).then((res) => {
      setPosts(res.data);
    });
  }, [API]);

  // Handle new post
  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await axios.post(`${API}/api/users`, {
      username: user.username,
      content,
    });

    setPosts([res.data, ...posts]);
    setContent("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">📊 Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg mt-auto"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.username} 👋</h1>

        {/* Post Form */}
        <form
          onSubmit={handlePost}
          className="bg-white shadow-md rounded-xl p-4 mb-6"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border p-3 rounded-lg mb-3"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Post
          </button>
        </form>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-xl p-4"
              >
                <h3 className="font-semibold text-purple-600">
                  @{post.username}
                </h3>
                <p className="text-gray-800 mt-2">{post.content}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
