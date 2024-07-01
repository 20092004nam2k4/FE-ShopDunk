import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

  return (
    <>
      {successMessage && <div className="success-message">{successMessage}</div>}
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
                      src={`http://localhost:8090/image/${product.image}`}
                      alt={product.name}
                    />
                    <p className="product-name">{product.name}</p>
                    <div className="product-price-wrapper">
                      <p className="product-discounted-price">
                        {parseInt(product.discountedPrice).toLocaleString()}₫
                      </p>
                      <div className="product-original-price-wrapper">
                        <p className="product-price">
                          {parseInt(product.price).toLocaleString()}₫
                        </p>
                        <p className="discount-tag">-{product.discount}%</p>
                      </div>
                    </div>
                    <p className="description">{product.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="view-more-btn">
              <Link to="/listProduct">Xem thêm sản phẩm</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
