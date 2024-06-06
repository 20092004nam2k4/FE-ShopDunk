import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import { FaStar } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const addToCart = () => {
    axios
      .post(`http://localhost:8090/api/products/addToCart/${id}?quantity=`)
      .then(() => {
        navigate("/cart");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/products/getInfoProduct/${id}`)
      .then((response) => {
        const discountedPrice = response.data.price * 0.7;
        const productWithDiscount = { ...response.data, discountedPrice };
        setProduct(productWithDiscount);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="product-detail">
        <div className="product-image-container">
          <img
            src={`http://localhost:8090/image/${product.image}`}
            alt={product.name}
          />
          <a href="/" className="back-to-home-link back-home">
            &lt; Quay lại trang chủ
          </a>
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => handleRatingChange(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                  />
                </label>
              );
            })}
          </div>
          <div className="star-rating-divider"></div>
          <div className="product-price-container">
            <p className="product-price-detail">
              Giá: {parseInt(product.discountedPrice).toLocaleString()}₫
            </p>
            <p className="old-price">
              <span className="old-price-number">
                {parseInt(product.price).toLocaleString()}₫
              </span>
            </p>
            <p className="giamgia">-{product.discount}%</p>
          </div>
          <div className="storage-info">
            <p>Dung lượng:</p>
            <div className="storage-options">
              <div className="storage-option">128GB</div>
              <div className="storage-option">256GB</div>
              <div className="storage-option">512GB</div>
            </div>
          </div>
          <div className="quantity">
            <p>Số lượng sản phẩm còn lại:</p>
            <p className="product-quantity">{product.quantity}</p>
          </div>
          <div className="description">
            <p>Tình trạng:</p>
            <p className="text-description">{product.description}</p>
            <button className="add-to-cart-btn" onClick={addToCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
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

export default ProductDetail;
