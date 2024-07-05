import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    setUserName(user);
    fetchCartItems(user);
  }, [userName]); // Thêm userName vào dependency array để theo dõi sự thay đổi của userName

  const fetchCartItems = (username) => {
    axios
      .get(`http://localhost:8090/api/products/cart/${username}`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const removeFromCart = (id) => {
    axios
      .delete(`http://localhost:8090/api/products/removeFromCart/${id}`)
      .then(() => {
        fetchCartItems(userName); // Gọi lại fetchCartItems sau khi xóa sản phẩm thành công
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  const updateQuantity = (id, newQuantity) => {
    // Lấy thông tin sản phẩm hiện tại từ cartItems
    const currentItem = cartItems.find((item) => item.id === id);

    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    if (newQuantity > currentItem.product.quantity) {
      alert(`Số lượng tối đa có thể đặt là ${currentItem.product.quantity}`);
      return;
    }

    axios
      .put(`http://localhost:8090/api/products/updateCart/${id}`, null, {
        params: { quantity: newQuantity },
      })
      .then(() => {
        fetchCartItems(userName); // Gọi lại fetchCartItems sau khi cập nhật số lượng thành công
      })
      .catch((error) => {
        console.error("Error updating product quantity:", error);
      });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };
  const handleCheckout = () => {
    axios
      .post(`http://localhost:8090/api/products/checkout/${userName}`)
      .then((response) => {
        alert("Đặt hàng thành công");
        setCartItems([]); // Xóa các sản phẩm khỏi giỏ hàng
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        alert("Error during checkout. Please try again.");
      });
  };

  return (
    <>
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
                    <th className="quantity-text">Số lượng</th>
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
                        <a
                          href={`/product/${item.product.id}`}
                          className="product-name"
                        >
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
                            className="quantity-button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input
                            className="input-text"
                            id={`quantity${item.id}`}
                            value={item.quantity}
                            size="4"
                            readOnly
                          />
                          <button
                            className="quantity-button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <i className="fas fa-plus"></i>
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
            <div className="sidebar-cart">
              <div className="cart-collaterals">
                <div className="deals">
                  <div className="coupon-box">
                    <div className="title">
                      <strong>Mã giảm giá</strong>
                    </div>
                    <div className="hint">
                      Nhập phiếu giảm giá của bạn tại đây
                    </div>
                    <div className="coupon-code">
                      <input
                        name="discountcouponcode"
                        id="discountcouponcode"
                        placeholder="Mã giảm giá"
                        type="text"
                        className="discount-coupon-code"
                        aria-label="Nhập mã phiếu giảm giá"
                      />
                      <button
                        type="submit"
                        name="applydiscountcouponcode"
                        id="applydiscountcouponcode"
                        className="button-2 apply-discount-coupon-code-button"
                      >
                        Áp dụng
                      </button>
                    </div>
                    <div className="total-info">
                      <table className="cart-total">
                        <tbody>
                          <tr className="order-subtotal">
                            <td className="cart-total-left">
                              <label>Tổng phụ:</label>
                            </td>
                            <td className="cart-total-right">
                              <span className="value-summary">
                                {calculateSubtotal().toLocaleString()}₫
                              </span>
                            </td>
                          </tr>
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
                  </div>
                </div>
                <div className="totals">
                  <div
                    id="terms-of-service-warning-box"
                    title="Điều khoản dịch vụ"
                    style={{ display: "none" }}
                  >
                    <p>
                      Vui lòng chấp nhận các điều khoản dịch vụ trước bước tiếp
                      theo.
                    </p>
                  </div>
                  <div className="terms-of-service">
                    <div className="d-flex">
                      <div>
                        <input
                          id="termsofservice"
                          type="checkbox"
                          name="termsofservice"
                        />
                      </div>
                      <label htmlFor="termsofservice">
                        <span className="rule-web">
                          Tôi đã đọc và đồng ý với
                        </span>
                        <a
                          href="/chinh-sach-doi-tra"
                          className="read"
                          target="_blank"
                        >
                          điều khoản và điều kiện
                        </a>
                        <span className="rule-web">của website</span>
                      </label>
                    </div>
                  </div>
                  <div className="checkout-buttons">
                    <button
                      type="submit"
                      id="checkout"
                      name="checkout"
                      value="checkout"
                      className="button-1 checkout-button"
                      onClick={handleCheckout}
                    >
                      Tiến hành đặt hàng
                    </button>
                  </div>
                  <div className="note-ck">
                    (*) Phí phụ thu sẽ được tính khi bạn tiến hành thanh toán.
                  </div>
                  <div className="addon-buttons"></div>
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
                <input
                  type="radio"
                  id="receive-store"
                  name="receive-method"
                  value="store"
                />
                <label htmlFor="receive-store">Nhận tại cửa hàng</label>
                <input
                  type="radio"
                  id="receive-delivery"
                  name="receive-method"
                  value="delivery"
                />
                <label htmlFor="receive-delivery">Giao tận nơi</label>
              </div>
              <div className="half-inputs">
                <input placeholder="Tỉnh, thành phố" />
                <input placeholder="Quận, huyện" />
              </div>
              <input placeholder="Ghi chú giao hàng" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
