import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductCart.css";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryId]);

  const fetchCategoryProducts = () => {
    axios
      .get(
        `http://localhost:8090/api/products/findProductsByCategory/${categoryId}`
      )
      .then((response) => {
        const updatedProducts = response.data.map((product) => {
          const price = parseFloat(product.price);
          const discountedPrice = price - (price * product.discount) / 100;
          return {
            ...product,
            discountedPrice: discountedPrice.toFixed(0),
          };
        });
        setProducts(updatedProducts);

        // Fetch category name
        if (response.data.length > 0) {
          setCategoryName(response.data[0].category.name);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <>
      <div className="tittle-headerCategory">
        <p>Trang chủ &nbsp;&gt; {categoryName}</p>
      </div>
      <div className="category-products-container">
        <h1 className="tittleIphone">{categoryName}</h1>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://shopdunk.com/images/uploaded/banner/banner 2024/thang_6/banner iPhone 15 T6_Danh mục.jpg"
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://shopdunk.com/images/uploaded/banner/banner 2024/thang_6/banner iPhone 15 T6_Danh mục.jpg"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://shopdunk.com/images/uploaded/banner/banner 2024/thang_6/banner iPhone 15 T6_Danh mục.jpg"
                alt="Third slide"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div className="product-list">
          {products.map((product, index) => (
            <React.Fragment key={product.id}>
              <Link to={`/product/${product.id}`} className="product-card-link">
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
              {(index + 1) % 4 === 0 && <div className="w-100"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <footer className="text-center text-lg-start bg-dark text-white footerMain">
        {/* <section
          style={{ height: "54px" }}
          className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        ></section> */}
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
            backgroundColor: "#41474b",
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

export default CategoryProducts;
