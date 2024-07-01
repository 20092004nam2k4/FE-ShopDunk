import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Notification from "./Notification"; // Import your Notification component
import "./ProductCart.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchProducts();

    const message = sessionStorage.getItem("loginSuccessMessage");
    if (message) {
      setSuccessMessage(message);
      sessionStorage.removeItem("loginSuccessMessage"); // Clear the message after displaying it
    }
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:8090/api/products/findListProductByCategory")
      .then((response) => {
        const updatedProducts = response.data.map((category) => {
          const updatedCategoryProducts = category.products.map((product) => {
            const price = parseFloat(product.price);
            const discountedPrice = price - (price * product.discount) / 100;
            return {
              ...product,
              discountedPrice: discountedPrice.toFixed(0),
            };
          });
          return {
            ...category,
            products: updatedCategoryProducts,
          };
        });
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleCloseNotification = () => {
    setSuccessMessage("");
  };

  return (
    <>
      {successMessage && (
        <Notification message={successMessage} onClose={handleCloseNotification} />
      )}
      <div className="totalDiv">
        {products.map((item) => (
          <div className="grey-text count-tr" key={item.id}>
            <h1 className="tittleIphone">{item.category.name}</h1>
            <div className="product-list">
              {item.products.slice(0, 4).map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="product-card-link"
                >
                  <div className="product-card">
                    <img
                      src={`http://localhost:809
