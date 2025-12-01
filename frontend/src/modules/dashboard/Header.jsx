import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { useCartContext } from "../shared/CartContext";

function Header() {
  const navigate = useNavigate();
  const { products } = useCartContext();

  return (
    <header>
      <div className="title">
        <h1
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Dummy Online Shop
        </h1>
      </div>
      <Button onClick={() => {}}>Cart ({products.length})</Button>
    </header>
  );
}

export default Header;
