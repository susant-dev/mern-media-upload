/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import useApi from "../shared/useApi";
import { API_URL } from "../../app-env";

function AddProductForm() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    product_name: "",
    category: "",
    price: "",
    description: "",
  });

  const { loading, data, error, formError, refetch } = useApi(
    `${API_URL}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
    { auto: false }
  );

  useEffect(() => {
    if (!data) return;
    alert(`Successfully added new product with id ${data._id}`);
    navigate(`/products-image/${data._id}`);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const body = product;
      refetch(body);
    },
    [product]
  );

  return (
    <div className="form-container">
      <h1>Add New Product</h1>

      <form className="form products-form" onSubmit={handleSubmit}>
        <div
          className="error"
          style={{ display: error ? "block" : "none", margin: "0 0 20px 0" }}
        >
          <p>{error}</p>
          <ul style={{ display: formError?.length > 0 ? "block" : "none" }}>
            {formError?.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        </div>
        <label htmlFor="product_name">Product Name</label>
        <input
          type="text"
          id="product_name"
          name="product_name"
          onChange={handleChange}
          disabled={loading}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          style={{ resize: "none" }}
          onChange={handleChange}
          disabled={loading}
          required
        ></textarea>

        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          onChange={handleChange}
          disabled={loading}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          disabled={loading}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Living</option>
          <option value="beauty">Beauty</option>
          <option value="sports">Sports</option>
          <option value="sports">Foods</option>
        </select>

        <Button style={{ margin: "18px 0" }} type="submit">
          {loading ? "Adding New Product..." : "Add Product"}
        </Button>
      </form>
    </div>
  );
}

export default AddProductForm;
