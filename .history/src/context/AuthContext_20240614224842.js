import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
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
