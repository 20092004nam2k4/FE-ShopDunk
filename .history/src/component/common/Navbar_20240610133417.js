import React, { useContext, useState } from "react";
import "./Navbar.css";
import { BsBag } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (isLoggedIn) {
      setShowDropdown(!showDropdown);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navbar-center">
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to="/">
              <img
                className="imageIcon"
                src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
                alt="ShopDunk Logo"
              />
            </Link>
          </li>
          <li>
            <a href="/category">Iphone</a>
          </li>
          <li>
            <a href="#ipad">Ipad</a>
          </li>
          <li>
            <a href="#mac">Mac</a>
          </li>
          <li>
            <a href="#watch">Watch</a>
          </li>
          <li>
            <a href="#maycu">Máy cũ</a>
          </li>
          <li>
            <a href="#phukien">Phụ kiện</a>
          </li>
          <li>
            <a href="#dichvu">Dịch vụ</a>
          </li>
          <li>
            <a href="#tintuc">Tin tức</a>
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
          <li onClick={handleIconClick}>
            <MdPeopleAlt
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="icon-people"
            />
            {isLoggedIn && showDropdown && (
              // <div className="dropdown active">
              //   <ul>
              //     <li onClick={() => navigate("/profile")}>Profile</li>
              //     <li onClick={handleLogout}>Logout</li>
              //   </ul>
              // </div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  Tài khoản của tôi
                </MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            )}
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
