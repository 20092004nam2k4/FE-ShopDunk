import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>User not logged in</p>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>Username: {user.userName}</p>
      <p>Email: {user.email}</p>
      <p>Full Name: {user.fullName}</p>
      <p>Gender: {user.gender}</p>
      <p>Date of Birth: {user.birthDate}</p>
      <p>Referral Code: {user.referralCode}</p>
    </div>
  );
};

export default UserProfile;
