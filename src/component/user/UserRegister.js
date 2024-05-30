import React, { useState } from "react";
import axios from "axios";

const RegisterUser = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    birthDate: "",
    referralCode: "",
    fullName: "",
    gender: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await axios.post(
        "http://localhost:8090/api/users/register",
        user
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="register-user">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="birthDate"
            value={user.birthDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Referral Code:</label>
          <input
            type="text"
            name="referralCode"
            value={user.referralCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={user.gender}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default RegisterUser;
