/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../shared/Button";
import useApi from "../shared/useApi";

function UploadImageForm() {
  const { productID } = useParams();

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // preview before upload

  const { loading, data, error, refetch } = useApi(
    "http://localhost:3000/products-image",
    { method: "POST" },
    { auto: false }
  );

  useEffect(() => {
    if (!productID) navigate("/products");
  }, []);

  useEffect(() => {
    if (!data?.product) return;
    alert(
      `Successfully uploaded new image for product with id ${data.product._id}`
    );
    navigate("/products");
  }, [data]);

  // Handle file selection
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      // Create a preview URL
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    console.log(productID);

    const formData = new FormData();
    formData.append("image", file); // Must match backend Multer field
    formData.append("product_id", productID);
    refetch(formData);
  };

  return (
    <div className="form-container">
      <h1>Upload Product Image</h1>

      <form className="form" onSubmit={handleSubmit}>
        {error && (
          <div className="error" style={{ marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <label htmlFor="image">Select Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleChange}
          disabled={loading}
          required
        />

        {preview && (
          <div style={{ marginTop: "20px" }}>
            <p>Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "200px", objectFit: "cover" }}
            />
          </div>
        )}

        <Button
          style={{ margin: "18px 0" }}
          disabled={file === null || loading}
          type="submit"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </Button>
      </form>
    </div>
  );
}

export default UploadImageForm;
