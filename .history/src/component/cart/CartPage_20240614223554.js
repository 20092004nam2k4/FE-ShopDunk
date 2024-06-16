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

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    sessionStorage.removeItem("user"); // Xóa thông tin người dùng khỏi sessionStorage
    setCartItems([]); // Đặt lại giỏ hàng thành rỗng
  };

  return (
    <div className="cart-page">
      <div className="title-header">
        <p>Trang chủ &nbsp;&gt; Giỏ Hàng</p>
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>
      {/* Các phần còn lại của component giỏ hàng */}
    </div>
  );
};

export default CartPage;
