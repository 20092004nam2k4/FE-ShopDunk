import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { BsBag } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null); // Ref cho thanh navbar

  useEffect(() => {
    // Function để xử lý khi click ra ngoài navbar
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowDropdown(false); // Ẩn dropdown menu khi click ra ngoài navbar
      }
    };

    document.addEventListener("mousedown", handleOutsideClick); // Thêm sự kiện mousedown
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Xóa sự kiện khi component unmount
    };
  }, []);

  const handleIconClick = () => {
    setShowDropdown(!showDropdown); // Hiển thị hoặc ẩn dropdown menu
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar-center" ref={navbarRef}>
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <a href="/">
              <img
                className="imageIcon"
                src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
                alt="ShopDunk Logo"
              />
            </a>
          </li>
          <li><Link to="/category/1">iPhone</Link></li>
          <li><Link to="/category/2">iPad</Link></li>
          <li><Link to="/category/3">Mac</Link></li>
          <li><Link to="/category/4">Watch</Link></li>
          <li><a href="#maycu">Máy cũ</a></li>
          <li><Link to="/category/5">Phụ kiện</Link></li>
          <li><a href="#dichvu">Dịch vụ</a></li>
          <li><a href="#tintuc">Tin tức</a></li>
          <li><a href="#khuyenmai">Khuyến mại</a></li>
          <li><BsSearch className="icon-search" /></li>
          <li><Link to="/cart"><BsBag className="icon-bag" /></Link></li>
          <li>
            <div className="icon-people" onClick={handleIconClick}>
              <MdPeopleAlt />
              {isLoggedIn && showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile">Tài khoản của tôi</Link>
                  <a href="/" onClick={handleLogout}>Đăng xuất</a>
                </div>
              )}
            </div>
          </li>
          <li>
            <img
              className="imageIconVN"
              src="https://shopdunk.com/images/flags/vn.png"
              alt="Vietnam Flag"
            />
          </li>
          <li>
            <img
              className="imageIconVN"
              src="https://shopdunk.com/images/flags/us.png"
              alt="US Flag"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
