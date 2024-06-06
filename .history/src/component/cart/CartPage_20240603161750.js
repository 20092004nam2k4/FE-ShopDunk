import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = () => {
    axios
      .get("http://localhost:8090/api/products/cart")
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeFromCart = (id) => {
    axios
      .delete(`http://localhost:8090/api/products/removeFromCart/${id}`)
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  const updateQuantity = (id, newQuantity) => {
    axios
      .put(`http://localhost:8090/api/products/updateCart/${id}`, {
        quantity: newQuantity,
      })
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        console.error("Error updating product quantity:", error);
      });
  };

  const handleQuantityChange = (id, increment) => {
    const item = cartItems.find((item) => item.id === id);
    const newQuantity = item.quantity + increment;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  return (
    <div className="cart-page">
      <div className="title-header">
        <p>Trang chủ &nbsp;&gt; Giỏ Hàng</p>
      </div>

      <div className="content">
        <div className="left">
          <div className="cart-detail">
            <table className="cart">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá bán</th>
                  <th>Số lượng</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <a href={`/product/${item.product.id}`}>
                        <img
                          alt={`Ảnh của ${item.product.name}`}
                          src={`http://localhost:8090/image/${item.product.image}`}
                          title={`Hiển thị chi tiết cho ${item.product.name}`}
                        />
                      </a>
                    </td>
                    <td className="product">
                      <a href={`/product/${item.product.id}`} className="product-name">
                        {item.product.name}
                      </a>
                    </td>
                    <td className="unit-price">
                      <span className="product-unit-price">
                        {parseInt(item.product.price).toLocaleString()}₫
                      </span>
                    </td>
                    <td className="quantity">
                      <div className="cart-quantity-input-container">
                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        <input
                          type="text"
                          value={item.quantity}
                          className="qty-input"
                          readOnly
                        />
                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </div>
                    </td>
                    <td className="remove-from-cart">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-button"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cart-collaterals">
            <div className="totals">
              <div className="totals-body">
                <table className="cart-total">
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Tổng phụ</th>
                      <td>
                        <span className="product-price">
                          {calculateSubtotal().toLocaleString()}₫
                        </span>
                      </td>
                    </tr>
                    <tr className="order-total">
                      <th>Tổng cộng</th>
                      <td>
                        <strong>
                          <span className="product-price">
                            {calculateTotal().toLocaleString()}₫
                          </span>
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="totals-footer">
                <a href="/checkout" className="btn btn-primary">
                  Tiến hành đặt hàng
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="shop">
            <a href="/">
              <svg
                id="ShopArrow"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33594 0.902344C5.33594 0.792969 5.29688 0.699219 5.21875 0.621094C5.14062 0.542969 5.04688 0.503906 4.9375 0.503906C4.82812 0.503906 4.73438 0.542969 4.65625 0.621094L0.15625 5.12109C0.078125 5.19922 0.0390625 5.29297 0.0390625 5.40234C0.0390625 5.51172 0.078125 5.60547 0.15625 5.68359L4.65625 10.1836C4.73438 10.2617 4.82812 10.3008 4.9375 10.3008C5.04688 10.3008 5.14062 10.2617 5.21875 10.1836C5.29688 10.1055 5.33594 10.0117 5.33594 9.90234C5.33594 9.79297 5.29688 9.69922 5.21875 9.62109L1.19531 5.59766H10.0977C10.207 5.59766 10.3008 5.55859 10.3789 5.48047C10.457 5.40234 10.4961 5.30859 10.4961 5.19922C10.4961 5.08984 10.457 4.99609 10.3789 4.91797C10.3008 4.83984 10.207 4.80078 10.0977 4.80078H1.19531L5.21875 0.777344C5.29688 0.699219 5.33594 0.605469 5.33594 0.496094V0.902344Z"
                  fill="#3B5A9A"
                ></path>
              </svg>
              <span>Tiếp tục mua sắm</span>
            </a>
          </div>
          <div className="deals">
            <div className="coupon-box">
              <div className="title">
                <strong>Mã giảm giá</strong>
              </div>
              <div className="hint">Nhập phiếu giảm giá của bạn tại đây</div>
              <input />
              <div className="coupon-code">
                <button
                  type="submit"
                  name="applydiscountcouponcode"
                  id="applydiscountcouponcode"
                  className="button-2 apply-discount-coupon-code-button"
                >
                  Áp dụng
                </button>
              </div>
              <div className="totals">
                <div className="total-info">
                  <table className="cart-total">
                    <tbody>
                      <tr className="order-total">
                        <td className="cart-total-left">
                          <label>Tổng cộng:</label>
                        </td>
                        <td className="cart-total-right">
                          <span className="value-summary">
                            {calculateTotal().toLocaleString()}₫
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="terms-of-service-warning-box"></div>
                <div className="terms-of-service">
                  <div className="d-flex">
                    <div>
                      <input
                        type="checkbox"
                        name="termsofservice"
                        className="check-box"
                        id="termsofservice"
                      />
                    </div>
                    <label htmlFor="termsofservice">
                      Tôi đã đọc và đồng ý với các điều khoản dịch vụ
                    </label>
                  </div>
                </div>
                <div className="button-wrapper-2">
                  <a href="/checkout" className="button-1 checkout-button">
                    Tiến hành đặt hàng
                  </a>
                </div>
              </div>
              <div className="continue">
                <a href="/">
                  <span>Tiếp tục mua sắm</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
