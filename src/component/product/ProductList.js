import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductCart.css";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/products/findListProductByCategory")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("loi", error);
      });
  }, []);
  return (
    <>
      <div>
        {products.map((item) => (
          <div className="grey-text count-tr" key={item.id}>
            <h1 className="tittleIphone">{item.category.name}</h1>
            <div className="product-list">
              {item.products.slice(0, 4).map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={"http://localhost:8090/image/" + product.image}
                    alt={product.name}
                  />
                  <p>{product.name}</p>
                  <p>Price: {product.price}₫</p>
                </div>
              ))}
            </div>
            {item.products.length > 4 && (
              <div className="a-category">
                <a
                  href={`/category/${item.category.id}`}
                  className="btn btn-outline-primary custom-blue"
                >
                  <span className="button-text">
                    Xem tất cả {item.category.name}&nbsp;&gt;
                  </span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
