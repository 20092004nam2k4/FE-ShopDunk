import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginUser = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/api/users/login",
        credentials
      );
      if (response.data.success) {
        setMessage("");
        login(response.data.user);
        navigate("/");
      } else {
        setMessage(response.data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="login-user">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={credentials.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>{message}</div>
      <p>
        Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
      </p>
    </div>
  );
};

export default LoginUser;
