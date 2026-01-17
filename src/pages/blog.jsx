import React, { useState } from "react";

function Create({ selectedPostId }) {
  const [formData, setFormData] = useState({
    blogName: "",
    category: "",
    image: null,
    author: "",
    publicationDate: "",
    content: "",
  });

  // Handle text, select & date inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   data.append("blogName", formData.blogName);
  //   data.append("category", formData.category);
  //   data.append("author", formData.author);
  //   data.append("publicationDate", formData.publicationDate);
  //   data.append("content", formData.content);
  //   data.append("image", formData.image);

  //   if (selectedPostId) {
  //    alert("Blog post updated successfully!");
  //     // PUT /api/blogs/:id
  //   } else {
  //     console.log("Creating post:", formData);
  //     // POST /api/blogs
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("blogName", formData.blogName);
  data.append("category", formData.category);
  data.append("author", formData.author);
  data.append("publicationDate", formData.publicationDate);
  data.append("content", formData.content);

  if (formData.image) {
    data.append("image", formData.image);
  }

  try {
    if (selectedPostId) {
      // UPDATE
      const response = await fetch(
        `http://localhost:4000/api/blogs/${selectedPostId}`,
        {
          method: "PUT",
          body: data,
        }
      );

      if (!response.ok) throw new Error("Failed to update post");

      alert("Blog post updated successfully!");
    } else {
      // CREATE
      const response = await fetch(
        "http://localhost:4000/api/blogs",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) throw new Error("Failed to create post");

      alert("New blog created successfully!");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
};


  const handleDelete = () => {
    console.log("Deleting post:", selectedPostId);
    // DELETE /api/blogs/:id
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {selectedPostId ? "Edit Blog Post" : "Create a Blog Post"}
        </h2>

        {/* Blog Name */}
        <input
          type="text"
          name="blogName"
          placeholder="Blog Title"
          value={formData.blogName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">Select Category</option>
          <option value="Tech">Technology</option>
          <option value="Cars">Cars</option>
          <option value="iPhone">iPhone</option>
          <option value="Fashion">Fashion</option>
          <option value="Food">Food</option>
        </select>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg"
            required={!selectedPostId}
          />
        </div>

        {/* Date */}
        <input
          type="date"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        {/* Author */}
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        {/* Content */}
        <textarea
          name="content"
          placeholder="Write your blog content..."
          value={formData.content}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 border rounded-lg"
          required
        />

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          
          >
            {selectedPostId ? "Update Post" : "Create Post"}

          </button>

          {selectedPostId && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Create;
