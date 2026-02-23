import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    blogName: "",
    category: "",
    image: null,
    author: "",
    date: "",
    content: "",
  });

  // Fetch the blog from backend using the id
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/blogs/${id}`);
        if (!response.ok) throw new Error("Blog not found");
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error(error);
        alert("Blog not found");
        navigate("/");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to update blog");

      alert("Blog updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // Delete blog from backend
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete blog");

      alert("Blog deleted!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-6 sm:px-6 md:px-8">
      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Edit Blog Post</h2>
            <p className="text-gray-600 mt-2">Update your blog post details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Blog Name</label>
                <input name="blogName" value={form.blogName} onChange={handleChange}
                  className="p-3 rounded-lg border border-gray-300 focus:border-purple-500 outline-none" />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Author</label>
                <input name="author" value={form.author} onChange={handleChange}
                  className="p-3 rounded-lg border border-gray-300 focus:border-purple-500 outline-none" />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Publication Date</label>
                <input type="date" name="publicationDate" value={form.publicationDate} onChange={handleChange}
                  className="p-3 rounded-lg border border-gray-300 focus:border-purple-500 outline-none" />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="p-3 rounded-lg border border-gray-300 focus:border-purple-500 outline-none">
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Technology">Technology</option>
                  <option value="Food">Food</option>
                  <option value="Cars">Cars</option>
                  <option value="iPhone">iPhone</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Content</label>
                <textarea name="content" value={form.content} onChange={handleChange} rows="6"
                  className="p-3 rounded-lg border border-gray-300 focus:border-purple-500 outline-none resize-none" />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button type="submit"
                className="flex-1 bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700">
                Save Changes
              </button>
              <button type="button" onClick={handleDelete}
                className="flex-1 bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600">
                Delete
              </button>
              <button type="button" onClick={() => navigate("/")}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200">
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