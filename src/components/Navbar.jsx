import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav
      className="navbar navbar-expand-lg mb-3 px-3"
      style={{ backgroundColor: "beige" }}
    >
      <Link className="navbar-brand" to="/dashboard">
        Mood Journal
      </Link>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item" style={{ alignSelf: "center" }}>
            <button className="btn btn-outline-danger btn-sm" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
