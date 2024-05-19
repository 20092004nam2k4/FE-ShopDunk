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
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">Price: {product.price}₫</p>
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
        <div className="info-banner">
          <p>
            <a href="http://doanhnghiep.shopdunk.com">
              <img
                className="img-info"
                src="https://shopdunk.com/images/uploaded/Trang chủ/2.jpeg"
              ></img>
            </a>
          </p>
        </div>
      </div>
      <footer className="text-center text-lg-start bg-dark text-white footerMain">
        <section
          style={{ height: "54px" }}
          className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        ></section>
        <section className="bg-dark" style={{ height: "243px" }}>
          <div className="container text-center text-md-start mt-5">
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
                  Here you can buy all products of Apple.
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
            backgroundColor: "black",
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
