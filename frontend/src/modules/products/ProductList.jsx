import useApi from "../shared/useApi";
import ProductItem from "./ProductItem";

function ProductList() {
  const { loading, data, error } = useApi("http://localhost:3000/products", {
    method: "GET",
  });

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error">error</p>;
  return (
    <div id="product-container">
      {data?.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
