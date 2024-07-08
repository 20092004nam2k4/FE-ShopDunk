import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    setUserName(user);
    fetchOrderDetails(user);
  }, [userName]);

  const fetchOrderDetails = (username) => {
    axios
      .get(`http://localhost:8090/api/products/order-details/${username}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };

  return (
    <>
      <div className="order-details-page">
        <h1>Đơn hàng của tôi</h1>
        {orders.map((order) => (
          <div key={order.id} className="order">
            <h2>Đơn hàng</h2>
            <p>
              Ngày đặt hàng: {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p>Tổng số tiền: {order.totalAmount.toLocaleString()}₫</p>
            <table className="order-items">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá bán</th>
                </tr>
              </thead>
              <tbody>
                {order.billItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>{(item.price * item.quantity).toLocaleString()}₫</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
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

export default OrdersPage;
