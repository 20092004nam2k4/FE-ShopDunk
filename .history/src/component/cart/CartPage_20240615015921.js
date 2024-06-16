import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./CartPage.css";
import { AuthContext } from "./AuthProvider";

const CartPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) {
      fetchCartItems(user.userName);
    } else {
      // Nếu không có user, lấy giỏ hàng từ localStorage
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(storedCart);
    }
  }, [user]);

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
        fetchCartItems(user.userName); // Gọi lại fetchCartItems sau khi xóa sản phẩm thành công
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
        fetchCartItems(user.userName); // Gọi lại fetchCartItems sau khi cập nhật số lượng thành công
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

  const handleLogout = async () => {
    try {
      await axios.post(`/api/products/logout/${user.userName}`);
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="cart-page">
      {/* Các phần khác của giao diện giỏ hàng */}
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
};

export default CartPage;
