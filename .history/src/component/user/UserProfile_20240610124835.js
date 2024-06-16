import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./UserProfile.css";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>User not logged in</p>;
  }
  return (
    <>
      <div className="page-container">
        <div className="container">
          <div className="navigation">
            <ul className="ul-content">
              <li>
                <a href="#">
                  <i className="fas fa-user"></i> Thông tin tài khoản
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i> Địa chỉ nhận hàng
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-clipboard-list"></i> Đơn đặt hàng
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-share-alt"></i> Hệ thống
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-gift"></i> Điểm thưởng
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-lock"></i> Đổi mật khẩu
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-image"></i> Ảnh đại diện
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-history"></i> Lịch sử đánh giá sản phẩm
                </a>
              </li>
            </ul>
          </div>
          <div className="form">
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="name">Tên, Họ:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={user ? user.fullName : ""}
                />
              </div>
              <div className="input-group input-email">
                <label className="email-info" htmlFor="email">
                  E-mail:
                </label>
                <input
                  className="email-text"
                  type="email"
                  id="email"
                  name="email"
                  placeholder={user ? user.email : ""}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="tel">Điện thoại:</label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  placeholder="0888658023"
                />
              </div>
              <div className="input-group input-gender">
                <label htmlFor="gender">Giới tính:</label>
                <div>
                  <input
                    className="radio-male"
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                  />
                  <label className="text-male" htmlFor="male">
                    Nam
                  </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                  />
                  <label className="text-female" htmlFor="female">
                    Nữ
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row birthday-row">
              <label htmlFor="birthday">Ngày sinh:</label>
              <select id="day" name="day">
                <option value={user ? user.birthDate : ""}>18</option>
              </select>
              <select id="month" name="month">
                <option value="Tháng Ba">Tháng Ba</option>
              </select>
              <select id="year" name="year">
                <option value="1941">1998</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="username">Username:</label>
              <p className="text-user">{user.userName}</p>
            </div>
            <button type="submit">Lưu lại</button>
          </div>
        </div>
        <div className="newsletter">
          <h2>Đăng kí nhận tin từ ShopDunk</h2>
          <p>Thông tin sản phẩm mới nhất và chương trình khuyến mãi</p>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập email đăng kí tại đây"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              Đăng kí
            </button>
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

export default UserProfile;
