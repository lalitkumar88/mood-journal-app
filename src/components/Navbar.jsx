import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div
      style={{
        backgroundColor: "burlywood",
        height: "50px",
        marginBottom: "10px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "row-reverse",
          gap: "10px",
          height: "50px",
          alignItems: "center",
          paddingRight: "2rem",
        }}
      >
        <li>
          <button onClick={logout}>Logout</button>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
