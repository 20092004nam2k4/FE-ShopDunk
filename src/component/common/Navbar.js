import React from "react";
import "./Navbar.css";
import { BsBag } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="navbar-center">
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <img
              className="imageIcon"
              src="https://shopdunk.com/images/thumbs/0012445_Logo_ShopDunk.png"
            />
          </li>
          <li>
            <a href="#iphone">Iphone</a>
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
            <BsBag className="icon-bag" />
          </li>
          <li>
            <MdPeopleAlt className="icon-people" />
          </li>
          <li>
            <img
              className="imageIconVN"
              src="https://shopdunk.com/images/flags/vn.png"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
