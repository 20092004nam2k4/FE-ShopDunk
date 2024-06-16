import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import { FaStar } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0); // State để lưu đánh giá từ người dùng
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng chọn số sao
  const handleRatingChange = (value) => {
    setRating(value); // Cập nhật state rating với giá trị từ người dùng
  };

  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  const addToCart = () => {
    axios
      .post(`http://localhost:8090/api/products/addToCart/${product.id}?quantity=1`)
      .then(() => {
        navigate("/cart");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  // Effect hook để fetch thông tin sản phẩm từ API khi component được render
  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/products/getInfoProduct/${id}`)
      .then((response) => {
        const discountedPrice = response.data.price * 0.7;
        const productWithDiscount = { ...response.data, discountedPrice };
        setProduct(productWithDiscount); // Lưu thông tin sản phẩm vào state
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  // Nếu sản phẩm chưa được fetch từ API, hiển thị "Loading..."
  if (!product) {
    return <div>Loading...</div>;
  }

  // JSX để hiển thị giao diện chi tiết sản phẩm
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
          {/* Hiển thị phần đánh giá sao */}
          <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              const onClick = index + 1;
              return (
                <FaStar
                  key={index}
                  className="star"
                  color={c <= rating ? "#ffc107" : "#e4e5e9"} // Đổi màu sao đã chọn thành màu vàng
                  onClick={() => handleRatingChange(ratingValue)} // Gọi hàm handleRatingChange khi người dùng click vào sao
                />
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
        {/* Phần footer của bạn */}
      </footer>
    </>
  );
};

export default ProductDetail;
