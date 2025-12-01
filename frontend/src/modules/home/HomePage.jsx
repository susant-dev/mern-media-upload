import { Link } from "react-router-dom";
import "./home.style.css";

function HomePage() {
  return (
    <main>
      <h1>Welcome to Dummy Online Shop!</h1>

      <p>
        Your go-to destination for stylish, affordable, and high-quality
        products. Whether you're looking for the latest gadgets, trendy fashion,
        or everyday essentials, we’ve got something for everyone. Our mission is
        simple: bring you great products at great prices, with a shopping
        experience that’s fast, friendly, and fun.
      </p>

      <p>
        Browse our featured items or explore our full collection to discover
        even more amazing finds.
      </p>

      <p>
        <Link to="/products" className="link">
          View All Products
        </Link>
      </p>
    </main>
  );
}

export default HomePage;
