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
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    axios
      .put(
        `http://localhost:8090/api/products/updateCart/${id}`,
        null,
        { params: { quantity: newQuantity } }
      )
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
                            className="quantity-button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
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


          <div class="sidebar-cart">
                        
                            <div class="cart-collaterals">
                                <div class="deals">
                                        <div class="coupon-box">
        <div class="title">
            <strong>Mã giảm giá</strong>
        </div>
        <div class="hint">
            Nhập phiếu giảm giá của bạn tại đây
        </div>
        <div class="coupon-code">
            <input name="discountcouponcode" id="discountcouponcode" placeholder="Mã giảm giá" type="text" class="discount-coupon-code" aria-label="Nhập mã phiếu giảm giá">

            <button type="submit" name="applydiscountcouponcode" id="applydiscountcouponcode" class="button-2 apply-discount-coupon-code-button">Áp dụng</button>
        </div>
    </div>
    

                                    
                                    
                                </div>
                            </div>
                    <div class="totals">
                        
                        <div class="total-info">
    <table class="cart-total">
        <tbody>
            <tr class="order-subtotal">
                <td class="cart-total-left">
                    <label>Tổng phụ:</label>
                </td>
                <td class="cart-total-right">
                    <span class="value-summary">29.390.000₫</span>
                </td>
            </tr>
            <tr class="order-total">
                <td class="cart-total-left">
                    <label>Tổng cộng:</label>
                </td>
                <td class="cart-total-right">
                        <span class="value-summary">29.390.000₫</span>
                </td>
            </tr>
        </tbody>
    </table>
</div>


                                <div id="terms-of-service-warning-box" title="Điều khoản dịch vụ" style="display: none;">
                                    <p>Vui lòng chấp nhận các điều khoản dịch vụ trước bước tiếp theo.</p>
                                </div>
                                <div class="terms-of-service">
                                    <div class="d-flex">
                                        <div><input id="termsofservice" type="checkbox" name="termsofservice" data-gtm-form-interact-field-id="0"></div>
                                        <label for="termsofservice"><span class="rule-web">Tôi đã đọc và đồng ý với</span><a href="/chinh-sach-doi-tra" class="read" target="_blank">điều khoản và điều kiện</a> <span class="rule-web">của website</span></label>
                                    </div>
                                        
                                </div>
                            <div class="checkout-buttons">
                                    
                                        <button type="submit" id="checkout" name="checkout" value="checkout" class="button-1 checkout-button">
                                            Tiến hành đặt hàng
                                        </button>
                            </div>
                            <div class="note-ck">(*) Phí phụ thu sẽ được tính khi bạn tiến hành thanh toán.</div>
                            <div class="addon-buttons">
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
            <input placeholder="Nhập địa chỉ"></input>
            <input placeholder="Họ và tên"></input>
            <div className="half-inputs">
              <input placeholder="Số điện thoại"></input>
              <input placeholder="Email"></input>
            </div>
            <div className="edit-address">
              <div className="delivery-method">
                <input type="radio" id="receive-store" name="receive-method" value="store"></input>
                <label htmlFor="receive-store">Nhận tại cửa hàng</label>
                <input type="radio" id="receive-delivery" name="receive-method" value="delivery"></input>
                <label htmlFor="receive-delivery">Giao tận nơi</label>
              </div>
              <div className="half-inputs">
                <input placeholder="Tỉnh, thành phố"></input>
                <input placeholder="Quận, huyện"></input>
              </div>
              <div>
                <input placeholder="Ghi chú"></input>
              </div>
              <div className="edit-address">
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
