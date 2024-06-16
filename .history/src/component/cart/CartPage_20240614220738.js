import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userName = sessionStorage.getItem("user");

  const fetchCartItems = () => {
    axios
      .get(`http://localhost:8090/api/products/cart/${userName}`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm trong giỏ hàng:", error);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, [userName]);

  const removeFromCart = (id) => {
    axios
      .delete(`http://localhost:8090/api/products/removeFromCart/${id}`)
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    axios
      .put(`http://localhost:8090/api/products/updateCart/${id}`, null, {
        params: { quantity: newQuantity },
      })
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
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

  return (
    <div className="cart-page">
      <div className="title-header">
        <p>Trang chủ &nbsp;&gt; Giỏ Hàng</p>
      </div>
      <div className="tong">
        <div className="left">
          <div className="cart-detail">
            <table className="cart">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá bán</th>
                  <th>Số lượng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <a href={`/product/${item.product.id}`}>
                        <img
                          alt={`Ảnh của ${item.product.name}`}
                          src={`http://localhost:8090/image/${item.product.image}`}
                          title={`Hiển thị chi tiết cho ${item.product.name}`}
                        />
                      </a>
                    </td>
                    <td className="product">
                      <a href={`/product/${item.product.id}`} className="product-name">
                        {item.product.name}
                      </a>
                    </td>
                    <td className="unit-price">
                      <span className="product-unit-price">
                        {parseInt(item.product.price).toLocaleString()}₫
                      </span>
                    </td>
                    <td className="quantity">
                      <div className="cart-quantity-input-container">
                        <button
                          className="quantity-button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <input
                          className="input-text"
                          id={`quantity${item.id}`}
                          value={item.quantity}
                          size="4"
                          readOnly
                        />
                        <button
                          className="quantity-button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td className="remove-from-cart">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-button"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
