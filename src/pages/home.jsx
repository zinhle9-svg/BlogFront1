import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Carblog,
  Fashionblog,
  Foodblog,
  iPhoneblog,
  Softwareblog,
} from "../assets";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([])

  // const [blogs, setBlogs] = useState([
  //   {
  //     id: 1,
  //     blogName: "Fashion",
  //     image: Fashionblog,     
  //     author: "Alice",
  //     date: "2025-07-01",
  //     category: "Lifestyle",
  //     content: "Latest fashion trends for 2025.",
  //   },
  //   {
  //     id: 2,
  //     blogName: "Dev",
  //     image: Softwareblog,
  //     author: "Bob",
  //     date: "2025-06-15",
  //     category: "Technology",
  //     content: "Exploring the newest in software development.",
  //   },
  //   {
  //     id: 3,
  //     blogName: "Food",
  //     image: Foodblog,
  //     author: "Charlie",
  //     date: "2025-05-10",
  //     category: "Food",
  //     content: "Delicious recipes from around the world.",
  //   },
  //   {
  //     id: 4,
  //     blogName: "Cars",
  //     image: Carblog,
  //     author: "Dana",
  //     date: "2025-04-20",
  //     category: "Cars",
  //     content: "Reviewing the latest car models.",
  //   },
  //   {
  //     id: 5,
  //     blogName: "iPhone",
  //     image: iPhoneblog,
  //     author: "Eve",
  //     date: "2025-03-01",
  //     category: "iPhone",
  //     content: "Everything about the newest iPhone.",
  //   },
  // ]);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  //  Fetch blogs from backend, getting syntax error here but not sure why, ive checked my code multiple times already
  useEffect(() => {
    const myBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/blogs')
        setBlogs(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
  myBlogs()

  }, [])

  // console.log(blogs)

  const imageClick = (blog, id) => {
    setSelectedBlog(blog);
    setSelectedIndex(id);
  };

 const deletePost = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );
  if (!confirmDelete) return;

  fetch(`api/blogs/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      setSelectedBlog(null);
      setSelectedIndex(null);
    })
    .catch((err) => console.error("Error deleting blog:", err));
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Blog list */}
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Blog Posts
              </h1>
              <button
                onClick={() => navigate("/createBlog")}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>New Post</span>
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  onClick={() => imageClick(blog, index)}
                  className="cursor-pointer bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] hover:bg-purple-50"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                    <img
                      src={`http://localhost:4000${blog.image}`}
                      alt={blog.blogName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.blogName}
                  </h2>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {blog.author}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{blog.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Blog details */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-24">
              {selectedBlog ? (
                <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
                  <div className="relative">
                    <img
                      src={selectedBlog.image}
                      alt={selectedBlog.blogName}
                      className="w-10 h-25 object-cover rounded-lg mb-4"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {selectedBlog.category}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedBlog.blogName}
                  </h2>

                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {selectedBlog.author}
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {selectedBlog.date}
                    </div>
                  </div>

                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {selectedBlog.content}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Close
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${selectedIndex}`)}
                      className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(selectedBlog.id)}
                      className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white/50 backdrop-blur-sm shadow-lg rounded-xl p-8 flex flex-col items-center justify-center space-y-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-purple-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg text-center">
                    Select a blog post to view its details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
