import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ padding: "20px" }}>
      <h3>User Profile</h3>
      <p style={{ padding: 0, margin: 0 }}>
        <strong>Email:</strong> {user.email}
      </p>
      <p style={{ padding: 0, margin: 0 }}>
        <strong>Account created on:</strong> --coming soon--
      </p>
    </div>
  );
}

export default Profile;
