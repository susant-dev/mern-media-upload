/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const cartProductsReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "CLEAR":
      return [];
    case "REMOVE":
      return state.products.filter(
        (product) => product._id !== action.payload._id
      );
    default:
      return state;
  }
};

const defaultValue = {
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  clearCart: () => {},
};

const CartContext = createContext(defaultValue);

export const CartContextProvider = ({ children }) => {
  const [products, dispatch] = useReducer(cartProductsReducer, []);

  const addProduct = (product) => {
    dispatch({ type: "ADD", payload: product });
  };

  const removeProduct = (product) => {
    dispatch({ type: "REMOVE", payload: product });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <CartContext.Provider
      value={{ products, addProduct, removeProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
