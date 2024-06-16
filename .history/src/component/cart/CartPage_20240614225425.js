import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./CartPage.css";
import { AuthContext } from "./AuthProvider"; // Import AuthContext từ provider

const CartPage = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext); // Sử dụng AuthContext
  const [cartItems, setCartItems] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (isLoggedIn && user) {
      setUserName(user.username);
      fetchCartItems(user.username);
    } else {
      fetchCartItems(''); // Fetch giỏ hàng của người dùng mặc định (ID = 0)
    }
  }, [isLoggedIn, user]); // Theo dõi sự thay đổi trong isLoggedIn và user

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
    logout(); // Sử dụng hàm logout từ AuthContext
  };

  return (
    <div className="cart-page">
      <div className="title-header">
        <p>Trang chủ &nbsp;&gt; Giỏ Hàng</p>
        {isLoggedIn && <button onClick={handleLogout}>Đăng xuất</button>}
      </div>
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Hiện không có sản phẩm nào trong giỏ hàng của bạn.</p>
        </div>
      ) : (
        <div className="cart-detail">
          {/* Hiển thị chi tiết giỏ hàng */}
        </div>
      )}
    </div>
  );
};

export default CartPage;
