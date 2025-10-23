// import { upload } from "@testing-library/user-event/dist/upload";
import React, { useState } from "react";

function Create({ selectedPostId }) {
  
  const [formData, setFormData] = useState({
    blogName: "",
    category: "",
    image: null,
    author: "",
    date: "",
    content: "",
  });
  // const imageuploadhandler = { 
  //   <div> action="/action_page.php"
  //   </div>  
  // }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPostId) {
      console.log("Updating post:", selectedPostId, formData);
      // call PUT /api/blogs/:id
    } else {
      console.log("Creating new post:", formData);
      // call POST /api/blogs
    }
  };

  const handleDelete = () => {
    console.log("Deleting post:", selectedPostId);
    // call DELETE /api/blogs/:id
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 sm:p-8 space-y-6 transform transition-all duration-300 hover:scale-[1.01] backdrop-blur-sm bg-opacity-95"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {selectedPostId ? "Edit Blog Post" : "Create a Blog Post"}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            {selectedPostId
              ? "Update your blog post details below"
              : "Share your thoughts with the world"}
          </p>
        </div>

        {/* Blog Name */}
        <div className="flex flex-col relative group">
          <label
            htmlFor="blogName"
            className="mb-2 font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-200"
          >
            Blog Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="blogName"
              name="blogName"
              value={formData.blogName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 hover:border-gray-400"
              placeholder="Enter blog name"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col relative group">
          <label
            htmlFor="category"
            className="mb-2 font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-200"
          >
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 hover:border-gray-400 appearance-none bg-white pr-10"
            >
              <option value="">Select a category</option>
              <option value="Dev">Technology</option>
              <option value="Cars">Cars</option>
              <option value="iPhone">iPhone</option>
              <option value="Fashion">Fashion</option>
              <option value="Food">Food</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* upload image */}
        <form action="https://1drv.ms/f/c/3f765e97cfe38762/EmKH48-XXnYggD9oAAAAAAABQOPajTprXyOm854LbMyvNw?e=IDmFKj">
  <input type="file" id="myFile" name="pictures"></input>
  {/* <input type="submit"></input> */}
</form>

    {/* date */}
        <div className="flex flex-col relative group">
          <label
            htmlFor="publicationDate"
            className="mb-2 font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-200"
          >
            Publication Date
              </label>
        </div>

    {/* date */}
        <div className="flex flex-col relative group">
          <label
            htmlFor="publicationDate"
            className="mb-2 font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-200"
          >
            Publication Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 hover:border-gray-400"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="flex flex-col relative group">
          <label
            htmlFor="author"
            className="mb-2 font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-200"
          >
            Author
          </label>
          <div className="relative">
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 hover:border-gray-400"
              placeholder="Enter author name"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
          <button
            type="submit"
            className="w-full sm:flex-1 bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transform transition-all duration-200 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {selectedPostId ? (
              <span className="flex items-center justify-center">
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
                Update Post
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Create Post
              </span>
            )}
          </button>

          {selectedPostId && (
            <button
              type="button"
              onClick={handleDelete}
              className="w-full sm:flex-1 bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600 transform transition-all duration-200 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <span className="flex items-center justify-center">
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
                Delete Post
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Create;
