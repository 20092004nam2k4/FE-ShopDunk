import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const LoginUser = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.userName || !credentials.password) {
      setMessage("Vui lòng nhập tên người dùng và mật khẩu");
      return; // Dừng hàm handleSubmit nếu có trường trống
    }
    console.log(e)
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8090/api/users/login",
    //     credentials
    //   );
    //   if (response.data.success) {
    //     setMessage("");
    //     login(response.data.user);
    //     navigate("/" + e.userName);
    //   } else {
    //     setMessage(response.data.message || "UserName hoặc mật khẩu sai");
    //   }
    // } catch (error) {
    //   setMessage("UserName hoặc mật khẩu sai");
    // }
  };

  return (
    <div>
      <div className="tittle-header">
        <p>Trang chủ &nbsp;&gt; Đăng nhập</p>
      </div>
      <div className="container">
        <div className="left-side">
          <img
            src="https://shopdunk.com/images/uploaded/banner/VNU_M492_08 1.jpeg"
            alt="Login Illustration"
          />
        </div>
        <div className="right-side">
          <form onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <div className="userName-login">
              <label>Username:</label>
              <input
                type="text"
                name="userName"
                value={credentials.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Đăng nhập</button>
          </form>
          <div>{message}</div>
          <p className="textToRegister">
            Bạn Chưa Có Tài Khoản? <Link to="/register">Đăng ký tại đây</Link>
          </p>
        </div>
      </div>
      <footer className="text-center text-lg-start bg-dark text-white footerMain">
        <section className="bg-dark" style={{ height: "243px" }}>
          <div className="container text-center text-md-start mt-5 textFooter">
            <div className="row mt-3 leftText">
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
    </div>
  );
};

export default LoginUser;
