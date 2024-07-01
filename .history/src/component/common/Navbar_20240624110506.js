import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BsBag } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowDropdown(!showDropdown);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/register");
    handleClose();
  };

  const handleLogin = () => {
    navigate("/login");
    handleClose();
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="navbar-center">
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <div onClick={handleLogoClick}>
              <img
                className="imageIcon"
                src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
                alt="ShopDunk Logo"
              />
            </div>
          </li>
          <li>
            <a href="/category/1">Iphone</a>
          </li>
          <li>
            <a href="/category/2">Ipad</a>
          </li>
          <li>
            <a href="/category/3">Mac</a>
          </li>
          <li>
            <a href="/category/4">Watch</a>
          </li>
          <li>
            <a href="#maycu">Máy cũ</a>
          </li>
          <li>
            <a href="/category/5">Phụ kiện</a>
          </li>
          <li>
            <a href="#dichvu">Dịch vụ</a>
          </li>
          <li>
            <a st>Tin tức</a>
          </li>
          <li>
            <a href="#khuyenmai">Khuyến mại</a>
          </li>
          <li>
            <BsSearch className="icon-search" />
          </li>
          <li>
            <Link to="/cart">
              <BsBag className="icon-bag" />
            </Link>
          </li>
          <li className="navbar-item">
            <MdPeopleAlt
              id="basic-button"
              aria-controls={showDropdown ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={showDropdown ? "true" : undefined}
              onClick={handleIconClick}
              className="icon-people"
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {isLoggedIn ? (
                <>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Tài khoản của tôi
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleRegister}>Tạo tài khoản</MenuItem>
                  <MenuItem onClick={handleLogin}>Đăng nhập</MenuItem>
                </>
              )}
            </Menu>
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
