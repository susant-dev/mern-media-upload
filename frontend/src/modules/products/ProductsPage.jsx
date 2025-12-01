import "./products.style.css";
import Button from "../shared/Button";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const navigate = useNavigate();

  return (
    <div id="product-page">
      <div className="head">
        <Button onClick={() => navigate("/add-products")}>
          Add New Product
        </Button>
      </div>
      <ProductList />
    </div>
  );
}

export default ProductsPage;
