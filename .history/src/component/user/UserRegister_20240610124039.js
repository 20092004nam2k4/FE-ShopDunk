import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import { useNavigate, Link } from "react-router-dom";

const RegistrationForm = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    birthDate: "",
    referralCode: "",
    fullName: "",
    gender: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // Clear error message when the user starts typing again
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await axios.post(
        "http://localhost:8090/api/users/register",
        user
      );
      setMessage("Đăng ký thành công");
      setUser({
        userName: "",
        password: "",
        email: "",
        birthDate: "",
        referralCode: "",
        fullName: "",
        gender: "",
        phone: "",
      }); // Clear form fields after successful registration
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data === "Email đã tồn tại") {
          setErrors({
            ...errors,
            email: "Email đã tồn tại",
          });
        } else if (error.response.data === "Username đã tồn tại") {
          setErrors({
            ...errors,
            userName: "Username đã tồn tại",
          });
        } else {
          setMessage("Đăng ký thất bại");
        }
      } else {
        setMessage("Đăng ký thất bại");
      }
    }
  };

  return (
    <>
      <div className="parent-container">
        <div className="registration-container">
          <div className="left-section">
            <img
              src="https://shopdunk.com/images/uploaded/banner/TND_M402_010 1.jpeg"
              alt="Registration"
              style={{ width: "650px", height: "450px" }}
            />
          </div>
          <div className="right-section">
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="referrer-code">Mã giới thiệu:</label>
                <input
                  type="text"
                  id="referrer-code"
                  name="referralCode"
                  value={user.referralCode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="full-name">Tên, Họ:</label>
                <input
                  type="text"
                  id="full-name"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Giới tính:</label>
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Nam"
                    checked={user.gender === "Nam"}
                    onChange={handleChange}
                  />
                  <label htmlFor="male">Nam</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Nữ"
                    checked={user.gender === "Nữ"}
                    onChange={handleChange}
                  />
                  <label htmlFor="female">Nữ</label>
                </div>
              </div>
              <div>
                <label htmlFor="birthday">Ngày sinh:</label>
                <input
                  type="date"
                  id="birthday"
                  name="birthDate"
                  value={user.birthDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div>
                <label htmlFor="phone">Điện thoại:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="userName"
                  value={user.userName}
                  onChange={handleChange}
                />
                {errors.userName && <div className="error">{errors.userName}</div>}
              </div>
              <div>
                <label htmlFor="password">Mật khẩu:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Đăng ký</button>
            </form>
            {message && <div className={`message ${message === 'Đăng ký thành công' ? 'success' : 'error'}`}>{message}</div>}
            <p className="textToRegister">
              Bạn đã có tài Khoản?{" "}
              <Link to="/login">Đăng nhập ngay</Link>
            </p>
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

export default RegistrationForm;
