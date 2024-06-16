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
    if (newQuantity <= 0) {
      axios
        .delete(`http://localhost:8090/api/products/updateCart/${id}`, {
          quantity: newQuantity,
        })
        .then(() => {
          fetchCartItems();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
        });
      return;
    }

    axios
      .put(`http://localhost:8090/api/products/updateCart/${id}`, null, {
        params: {
          quantity: newQuantity,
        },
      })
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
      });
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
      <div className="tong">
        <div className="left">
          <div className="cart-detail">
            <table className="cart">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá bán</th>
                  <th>Số lượng</th>
                  <th></th>
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
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          className="input-text"
                          value={item.quantity}
                          size="4"
                          readOnly
                        />
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
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
        </div>
        <div className="right">
          <div className="cart-collaterals">
            <div className="totals">
              <div className="total-info">
                <table className="cart-total">
                  <thead>
                    <tr>
                      <th colSpan="2">Tổng đơn hàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="cart-item-subtotal">
                      <td>Toàn bộ phụ</td>
                      <td>
                        <span className="value">{calculateSubtotal().toLocaleString()}₫</span>
                      </td>
                    </tr>
                    <tr className="order-total">
                      <td>Toàn bộ</td>
                      <td>
                        <span className="value">{calculateTotal().toLocaleString()}₫</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="checkout-buttons">
                  <button className="checkout-button">Proceed to Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="thanhtoan">
        <h3>Thông tin thanh toán</h3>
      </div>
      <div className="tong-bot">
        <div className="left">
          <div className="enter-address bg-white">
            <h6>Giao tận nơi</h6>
            <input placeholder="Nhập địa chỉ" />
            <input placeholder="Họ và tên" />
            <div className="half-inputs">
              <input placeholder="Số điện thoại" />
              <input placeholder="Email" />
            </div>
            <div className="edit-address">
              <div className="delivery-method">
                <input type="radio" id="receive-store" name="receive-method" value="store" />
                <label htmlFor="receive-store">Nhận tại cửa hàng</label>
                <input type="radio" id="receive-delivery" name="receive-method" value="delivery" />
                <label htmlFor="receive-delivery">Giao tận nơi</label>
              </div>
              <div className="half-inputs">
                <input placeholder="Tỉnh, thành phố" />
                <input placeholder="Quận, huyện" />
              </div>
              <div>
                <input placeholder="Ghi chú" />
              </div>
              <div className="edit-address">
                <input type="checkbox" id="company-invoice" name="company-invoice" value="company-invoice" />
                Xuất hóa đơn công ty
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
