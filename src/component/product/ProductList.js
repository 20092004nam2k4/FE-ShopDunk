import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductCart.css";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/products/showAll")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("loi", error);
      });
  }, []);

  return (
    <>
      <h1 className="tittleIphone">Iphone</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={"http://localhost:8090/image/" + product.image} />
            <p>{product.name}</p>
            <p>Price: {product.price}₫</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
