import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
      <Link className="navbar-brand fw-bold" to="/dashboard">
        Mood Journal
      </Link>

      {/* Toggler Button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Content */}
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarContent"
      >
        <ul className="navbar-nav align-items-lg-center">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/entries">
              List Entries
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>

          <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
            <button
              className="btn btn-outline-danger btn-sm w-100"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
