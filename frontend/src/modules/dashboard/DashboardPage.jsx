import "./dashboard.style.css";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import { CartContextProvider } from "../shared/CartContext";

function DashboardPage() {
  return (
    <>
      <CartContextProvider>
        <Header />
        <NavBar />
        <Outlet />
      </CartContextProvider>
    </>
  );
}

export default DashboardPage;
