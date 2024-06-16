
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
        fetchCartItems(); // Refresh the cart items after removing
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      // Nếu số lượng mới <= 0, xóa sản phẩm khỏi giỏ hàng
      axios.delete(`http://localhost:8090/api/products/updateCart/${id}`, {
        quantity: newQuantity,
      })
      .then(() => {
        fetchCartItems();  // Làm mới giỏ hàng sau khi xóa
      })
      .catch((error) => {
        console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      });
      return;
    }
  
    // Gửi yêu cầu PUT để cập nhật số lượng sản phẩm
    axios.put(`http://localhost:8090/api/products/updateCart/${id}`, null, {
      params: {
        quantity: newQuantity,
      },
    })
    .then(() => {
      fetchCartItems();  // Làm mới giỏ hàng sau khi cập nhật
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
                      <div className="edit-item"></div>
                    </td>
                    <td className="unit-price">
                      <span className="product-unit-price">
                        {parseInt(item.product.price).toLocaleString()}₫
                      </span>
                    </td>
                    <td className="quantity">
                      <div className="cart-quantity-input-container">
                        <svg
                          id={`cart-quantity-input-subtract${item.id}`}
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <path
                            d="M-0.00390625 5.90234H11.0039C11.1133 5.90234 11.207 5.86328 11.2852 5.78516C11.3633 5.70182 11.4023 5.60547 11.4023 5.49609C11.4023 5.38672 11.3633 5.29297 11.2852 5.21484C11.207 5.13672 11.1133 5.09766 11.0039 5.09766H-0.00390625C-0.0768229 5.09766 -0.144531 5.11589 -0.207031 5.15234C-0.264323 5.1888 -0.311198 5.23828 -0.347656 5.30078C-0.384115 5.35807 -0.402344 5.42318 -0.402344 5.49609C-0.402344 5.57422 -0.384115 5.64453 -0.347656 5.70703C-0.311198 5.76432 -0.264323 5.8112 -0.207031 5.84766C-0.144531 5.88411 -0.0768229 5.90234 -0.00390625 5.90234Z"
                            fill="#0066CC"
                          />
                        </svg>

                        {/* Input hiển thị số lượng */}
                        <input
                          className="input-text"
                          id={`quantity${item.id}`}
                          value={item.quantity}
                          size="4"
                          readOnly
                        />

                        {/* Nút tăng số lượng */}
                        <svg
                          id={`cart-quantity-input-add${item.id}`}
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <path
                            d="M-0.304688 6.5C-0.304688 6.61458 -0.265625 6.71094 -0.1875 6.78906C-0.104167 6.86719 -0.0104167 6.90625 0.09375 6.90625H5.19531V12.0078C5.19531 12.1172 5.23438 12.2109 5.3125 12.2891C5.39583 12.3672 5.49219 12.4062 5.60156 12.4062C5.71094 12.4062 5.80729 12.3672 5.89062 12.2891C5.96875 12.2109 6.00781 12.1172 6.00781 12.0078V6.90625H11.1094C11.2239 6.90625 11.3177 6.86719 11.3906 6.78906C11.4739 6.71094 11.5156 6.61458 11.5156 6.5C11.5156 6.39583 11.4739 6.30208 11.3906 6.21875C11.3177 6.13542 11.2239 6.09375 11.1094 6.09375H6.00781V1.00781C6.00781 0.893229 5.96875 0.799479 5.89062 0.726562C5.80729 0.653646 5.71094 0.617188 5.60156 0.617188C5.49219 0.617188 5.39583 0.653646 5.3125 0.726562C5.23438 0.799479 5.19531 0.893229 5.19531 1.00781V6.09375H0.09375C-0.0104167 6.09375 -0.104167 6.13542 -0.1875 6.21875C-0.265625 6.30208 -0.304688 6.39583 -0.304688 6.5Z"
                            fill="#0066CC"
                          />
                        </svg>
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
      <div cl>
        <h3>Thông tin thanh toán</h3>
      </div>
      <div className="tong-bot">
        <div class="left">
          <div class="enter-address bg-white">
            <h6>Giao tận nơi</h6>
            <input placeholder="Nhập địa chỉ"></input>
            <input placeholder="Họ và tên"></input>
            <div class="half-inputs">
              <input placeholder="Số điện thoại"></input>
              <input placeholder="Email"></input>
            </div>
            <div class="edit-address">
              <div class="delivery-method">
                <input type="radio" id="receive-store" name="receive-method" value="store"></input>
                <label for="receive-store">Nhận tại cửa hàng</label>
                <input type="radio" id="receive-delivery" name="receive-method" value="delivery"></input>
                <label for="receive-delivery">Giao tận nơi</label>
              </div>
              <div class="half-inputs">
                <input placeholder="Tỉnh, thành phố"></input>
                <input placeholder="Quận, huyện"></input>
              </div>
              <div>
                <input placeholder="Ghi chú"></input>
              </div>
              <div class="edit-address">
                <input type="checkbox" id="company-invoice" name="company-invoice" value="company-invoice"></input>Xuất hóa đơn công ty
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default CartPage;
