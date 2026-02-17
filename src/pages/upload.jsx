import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);

  // handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // handle upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("pic1", file); // must match multer name

    try {
      const response = await fetch(
        "http://localhost:4000/api/blogs/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.text();
      alert(data);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>

      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
