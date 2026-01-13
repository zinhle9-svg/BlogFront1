import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const API = "http://localhost:4000/api/blogs";

  // ✅ FETCH BLOGS
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ DELETE BLOG
  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);

      // Remove deleted blog from UI
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      setSelectedBlog(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT: BLOG LIST */}
        <div>
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold">Blog Posts</h1>
            <button
              onClick={() => navigate("/createBlog")}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              New Post
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="cursor-pointer bg-white shadow rounded-lg p-4 hover:bg-purple-50"
              >
                <img
                  src={`http://localhost:4000${blog.image}`}
                  alt={blog.blogName}
                  className="h-40 w-full object-cover rounded"
                />
                <h2 className="font-bold mt-2">{blog.blogName}</h2>
                <p className="text-sm text-gray-500">
                  {blog.author} • {blog.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: BLOG DETAILS */}
        <div>
          {selectedBlog ? (
            <div className="bg-white shadow rounded-xl p-6">
              <img
                src={`http://localhost:4000${selectedBlog.image}`}
                className="w-full h-60 object-cover rounded"
                alt=""
              />

              <h2 className="text-2xl font-bold mt-4">
                {selectedBlog.blogName}
              </h2>

              <p className="text-gray-500">
                {selectedBlog.author} • {selectedBlog.date}
              </p>

              <p className="mt-4">{selectedBlog.content}</p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => navigate(`/edit/${selectedBlog.id}`)}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePost(selectedBlog.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center bg-violet-500/20 p-10 rounded-xl text-gray-700">
              Select a blog to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
