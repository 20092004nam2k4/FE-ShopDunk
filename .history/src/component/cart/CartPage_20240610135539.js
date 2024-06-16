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
    axios
      .put(`http://localhost:8090/api/products/updateCart/${id}`, {
        quantity: newQuantity,
      })
      .then(() => {
        fetchCartItems(); // Refresh the cart items after updating
      })
      .catch((error) => {
        console.error("Error updating product quantity:", error);
      });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  return (<>

 
    <div className="cart-page">
      <div>
        <p className="tittle-header">Trang chủ &nbsp;&gt; Giỏ Hàng</p>
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
                          <g clipPath="url(#clip0_10158_65576)">
                            <path
                              d="M-0.00390625 5.90234H11.0039C11.1133 5.90234 11.207 5.86328 11.2852 5.78516C11.3633 5.70182 11.4023 5.60547 11.4023 5.49609C11.4023 5.38672 11.3633 5.29297 11.2852 5.21484C11.207 5.13672 11.1133 5.09766 11.0039 5.09766H-0.00390625C-0.0768229 5.09766 -0.144531 5.11589 -0.207031 5.15234C-0.264323 5.1888 -0.311198 5.23828 -0.347656 5.30078C-0.384115 5.35807 -0.402344 5.42318 -0.402344 5.49609C-0.402344 5.57422 -0.384115 5.64453 -0.347656 5.70703C-0.311198 5.76432 -0.264323 5.8112 -0.207031 5.84766C-0.144531 5.88411 -0.0768229 5.90234 -0.00390625 5.90234Z"
                              fill="#0066CC"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_10158_65576">
                              <rect width="11" height="11" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <input
                          className="input-text"
                          id={`quantity${item.id}`}
                          value={item.quantity}
                          size="4"
                          readOnly
                        />
                        <svg
                          id={`cart-quantity-input-add${item.id}`}
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => updateQuantity(item.id, item.setCartItems.quantity + 1)}
                        >
                          <g clipPath="url(#clip0_10158_65579)">
                            <path
                              d="M-0.304688 6.5C-0.304688 6.61458 -0.265625 6.71094 -0.1875 6.78906C-0.104167 6.86719 -0.0104167 6.90625 0.09375 6.90625H5.19531V12.0078C5.19531 12.1172 5.23438 12.2109 5.3125 12.2891C5.39583 12.3672 5.49219 12.4062 5.60156 12.4062C5.71094 12.4062 5.80729 12.3672 5.89062 12.2891C5.96875 12.2109 6.00781 12.1172 6.00781 12.0078V6.90625H11.1094C11.2239 6.90625 11.3177 6.86719 11.3906 6.78906C11.4739 6.71094 11.5156 6.61458 11.5156 6.5C11.5156 6.39583 11.4739 6.30208 11.3906 6.21875C11.3177 6.13542 11.2239 6.09375 11.1094 6.09375H6.00781V1.00781C6.00781 0.893229 5.96875 0.799479 5.89062 0.726562C5.80729 0.653646 5.71094 0.617188 5.60156 0.617188C5.49219 0.617188 5.39583 0.653646 5.3125 0.726562C5.23438 0.799479 5.19531 0.893229 5.19531 1.00781V6.09375H0.09375C-0.0104167 6.09375 -0.104167 6.13542 -0.1875 6.21875C-0.265625 6.30208 -0.304688 6.39583 -0.304688 6.5Z"
                              fill="#0066CC"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_10158_65579">
                              <rect
                                width="11.8125"
                                height="12.8125"
                                fill="white"
                                transform="translate(0.09375 0.09375)"
                              ></rect>
                            </clipPath>
                          </defs>
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
        <div className="deals">
            <div className="coupon-box">
              <div className="title">
                <strong>Mã giảm giá</strong>
              </div>
              <div className="hint">Nhập phiếu giảm giá của bạn tại đây</div>
              <input></input>
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
                <div id="terms-of-service-warning-box"></div>
                <div className="terms-of-service">
                  <div className="d-flex">
                    <div>
                      <td className="remove-from-cart">
                        <input
                          type="checkbox"
                          name="removefromcart"
                          id="removefromcart274337"
                          value="274337"
                          aria-label="Tẩy"
                        />
                        <button
                          type="button"
                          name="updatecart"
                          className="remove-btn once-submit-button"
                          onClick={() => {
                            document.getElementById(
                              "removefromcart274337"
                            ).checked = true;
                            document.getElementById("updatecart").click();
                          }}
                        ></button>
                      </td>
                    </div>
                    <br></br>
                    <label htmlFor="termsofservice">
                      <span className="rule-web">Tôi đã đọc và đồng ý với</span>
                      <a
                        href="/chinh-sach-doi-tra"
                        className="read"
                        target="_blank"
                      >
                        điều khoản và điều kiện
                      </a>{" "}
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
        H
      
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

export default CartPage;














