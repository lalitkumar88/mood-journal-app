import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEntry, getEntries } from "../api/journal";
import { AuthContext } from "../context/AuthContext";
import MoodChart from "../components/MoodChart";

function Dashboard() {
  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="p-4 mb-4 bg-light rounded-3 shadow-sm">
        <div className="container-fluid py-3">
          <h2 className="fw-bold">Welcome Back</h2>
          <p className="col-md-8 fs-5 text-muted">
            Track your emotional journey and observe your mood trends over time.
          </p>

          <Link to="/add-entry" className="btn btn-warning btn-lg">
            + Add New Entry
          </Link>
        </div>
      </div>

      {/* Chart Section */}
      <div className="card shadow-sm p-4">
        <h5 className="mb-4 text-center">Mood Trend</h5>
        <MoodChart />
      </div>
    </div>
  );
}

export default Dashboard;
