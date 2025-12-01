import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./modules/dashboard/DashboardPage";
import ProductsPage from "./modules/products/ProductsPage";
import HomePage from "./modules/home/HomePage";
import AddProductForm from "./modules/products/AddProductForm";
import UploadImageForm from "./modules/products/UploadProductImage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />}>
            <Route index element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add-products" element={<AddProductForm />} />
            <Route
              path="/products-image/:productID"
              element={<UploadImageForm />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
