const [image, setImage] = useState({
    preview: '',
    raw: '',
  });
  const handlePhotoChange = (e:) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  <input
          name="image"
          type="file"
          id="upload-button"
          style={{ display: 'none' }}
          onChange={handlePhotoChange}
        />
