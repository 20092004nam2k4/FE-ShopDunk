import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductCart.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetchProducts()
    // Kiểm tra thông báo đăng nhập từ Session Storage
    const message = sessionStorage.getItem("loginSuccessMessage");
    if (message) {
      window.alert(message); // Hiển thị thông báo bằng alert
      sessionStorage.removeItem("loginSuccessMessage"); // Xóa thông báo sau khi hiển thị
    }
  }, []);
  useEffect(() => {
    fetchProducts();
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
                  </div>
                </Link>
              ))}
            </div>
            {item.products.length > 4 && (
              <div className="a-category">
                <Link
                  to={`/category/${item.category.id}`} // Update this to Link instead of <a>
                  className="btn btn-outline-primary custom-blue"
                >
                  <span className="button-text">
                    Xem tất cả {item.category.name}&nbsp;&gt;
                  </span>
                </Link>
              </div>
            )}
          </div>
        ))}
        <div className="info-banner">
          <p>
            <a href="http://doanhnghiep.shopdunk.com">
              <img
                className="img-info"
                src="https://shopdunk.com/images/uploaded/Trang chủ/2.jpeg"
                alt="Info Banner"
              />
            </a>
          </p>
        </div>
      </div>
      <footer className="text-center text-lg-start bg-dark text-white footerMain">
        <section className="bg-dark" style={{ height: "243px" }}>
          <div className="container text-center text-md-start mt-5 textFooter">
            <div className="row mt-3">
              <div
                className="col-md-3 col-lg-4 col-xl-3 text-left mb-4"
                style={{ marginLeft: "104px" }}
              >
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ fontSize: "19px" }}
                >
                  <i className="fas fa-gem me-3" />
                  Shopdunk
                </h6>
                <p style={{ fontSize: "16px" }}>
                  Bạn có thể mua tất cả sản phẩm của Apple tại đây.
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 text-left mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ fontSize: "19px" }}
                >
                  Sản phẩm
                </h6>
                <p style={{ fontSize: "16px" }}>Thông tin</p>
                <p style={{ fontSize: "16px" }}>Trợ giúp</p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 text-left mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ fontSize: "19px" }}
                >
                  Thành viên
                </h6>
                <p style={{ fontSize: "16px" }}>Ngoc Linh</p>
                <p style={{ fontSize: "16px" }}>Dinh Manh</p>
                <p style={{ fontSize: "16px" }}>Phuong Nam</p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 text-left mb-md-0 mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ fontSize: "19px" }}
                >
                  Liên hệ
                </h6>
                <p style={{ fontSize: "16px" }}>Hoài Đức - Hà Nội</p>
                <p style={{ fontSize: "16px" }}>shopdunkWeb.com</p>
                <p style={{ fontSize: "16px" }}>+84 88658023</p>
                <p style={{ fontSize: "16px" }}>+84 99099909</p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-4 bg-dark"
          style={{
            backgroundColor: "#40474b",
            height: "70px",
            fontSize: "21px",
            textAlign: "center",
          }}
        >
          © 2024 WebShopDunk
        </div>
      </footer>
    </>
  );
};

export default ProductList;
