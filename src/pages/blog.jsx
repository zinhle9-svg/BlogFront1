import React, { useState } from "react";

function Create({ selectedPostId }) {

  const [image, setImage] = useState({
    preview: "",
    raw: "",
  });

  const [formData, setFormData] = useState({
    blogName: "",
    category: "",
    image: null,
    author: "",
    publicationDate: "",
    content: "",
  });

  // handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle image upload
  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });

      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    try {
      if (selectedPostId) {
        // UPDATE
        const response = await fetch(
          `http://localhost:4000/api/blogs/${selectedPostId}`,
          {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
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
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
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
          />

          {image.preview && (
            <img
              src={image.preview}
              alt="preview"
              className="mt-3 rounded-lg"
            />
          )}
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
