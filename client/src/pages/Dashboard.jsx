import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  // Fetch posts
  useEffect(() => {
    axios.get("https://xmedia-1.onrender.com/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  // Handle new post
  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await axios.post("https://xmedia-1.onrender.com/api/posts", {
      username: user.username,
      content,
    });

    setPosts([res.data, ...posts]);
    setContent("");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col p-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-10">📊 XMedia</h2>

        <div className="flex-1">
          <p className="text-gray-600 mb-4">Hello,</p>
          <h3 className="text-lg font-semibold text-gray-800">
            {user.username}
          </h3>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-6 shadow"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome back, {user.username} 👋
        </h1>

        {/* Post Form */}
        <form
          onSubmit={handlePost}
          className="bg-white shadow-md rounded-xl p-6 mb-8 border"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 outline-none mb-4"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Post
          </button>
        </form>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-sm rounded-xl p-5 border hover:shadow-md transition"
              >
                <h3 className="font-semibold text-purple-600">@{post.username}</h3>
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
