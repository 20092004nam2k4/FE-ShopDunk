import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    if (user) {
      try {
        // Gửi yêu cầu xóa giỏ hàng của người dùng trên server
        await axios.post("/api/users/logout", { userName: user.userName });
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
      } catch (error) {
        console.error("Logout failed:", error);
        // Dù có lỗi xảy ra, vẫn xóa thông tin người dùng khỏi localStorage và cập nhật trạng thái
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
