// EditPost.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Carblog,
  Fashionblog,
  Foodblog,
  iPhoneblog,
  Softwareblog,
} from "../assets";

const dummyBlogs = [
  {
    blogName: "Fashion",
    image: Fashionblog,
    author: "Alice",
    date: "2025-07-01",
    category: "Lifestyle",
    content: "Latest fashion trends for 2025.",
  },
  {
    blogName: "Dev",
    image: Softwareblog,
    author: "Bob",
    date: "2025-06-15",
    category: "Technology",
    content: "Exploring the newest in software development.",
  },
  {
    blogName: "Food",
    image: Foodblog,
    author: "Charlie",
    date: "2025-05-10",
    category: "Food",
    content: "Delicious recipes from around the world.",
  },
  {
    blogName: "Cars",
    image: Carblog,
    author: "Dana",
    date: "2025-04-20",
    category: "Cars",
    content: "Reviewing the latest car models.",
  },
  {
    blogName: "iPhone",
    image: iPhoneblog,
    author: "Eve",
    date: "2025-03-01",
    category: "iphone",
    content: "Everything about the newest iPhone.",
  },
];

function EditPost() {
  const { id } = useParams(); // Expecting `id` to be the index of the blog
  const navigate = useNavigate();
  const [form, setForm] = useState({
    blogName: "",
    author: "",
    date: "",
    category: "",
    content: "",
  });

  useEffect(() => {
    const blog = dummyBlogs[id];
    if (blog) {
      setForm(blog);
    } else {
      alert("Blog not found");
      navigate("/");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated blog post:", form);
    // Ideally send the updated data to the backend or global store here
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Edit Blog Post
            </h2>
            <p className="text-gray-600 mt-2">
              Update your blog post details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Blog Name */}
              <div className="flex flex-col">
                <label
                  className="mb-2 font-medium text-gray-700"
                  htmlFor="blogName"
                >
                  Blog Name
                </label>
                <input
                  id="blogName"
                  name="blogName"
                  value={form.blogName}
                  onChange={handleChange}
                  className="p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                />
              </div>

              {/* Author */}
              <div className="flex flex-col">
                <label
                  className="mb-2 font-medium text-gray-700"
                  htmlFor="author"
                >
                  Author
                </label>
                <input
                  id="author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <label
                  className="mb-2 font-medium text-gray-700"
                  htmlFor="date"
                >
                  Publication Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label
                  className="mb-2 font-medium text-gray-700"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                >
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Technology">Technology</option>
                  <option value="Food">Food</option>
                  <option value="Cars">Cars</option>
                  <option value="iPhone">iPhone</option>
                </select>
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <label
                  className="mb-2 font-medium text-gray-700"
                  htmlFor="content"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows="6"
                  className="p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 resize-none"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transform transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
