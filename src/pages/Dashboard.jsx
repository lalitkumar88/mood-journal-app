import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MoodChart from "../components/MoodChart";
import AnalyticalSummary from "../components/AnalyticsSummary";
import { AuthContext } from "../context/AuthContext";
import { getEntries } from "../api/journal";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const entries = user ? getEntries(user.email) : [];

  return (
    <div className="container py-4">
      {/* Hero Section */}
      <div className="p-4 mb-4 bg-light rounded-3 shadow-sm">
        <div className="py-2">
          <h2 className="fw-bold">Welcome Back</h2>

          <p className="text-muted mb-3">
            Track your emotional journey and observe your mood trends over time.
          </p>

          <Link
            to="/add-entry"
            className="btn btn-warning btn-lg w-100 w-md-auto"
          >
            + Add New Entry
          </Link>
        </div>
      </div>

      {/* Analytics Summary */}
      <AnalyticalSummary entries={entries} />

      {/* Chart Section */}
      <div className="card shadow-sm p-3 p-md-4">
        <h5 className="mb-3 text-center">Mood Trend</h5>
        <MoodChart />
      </div>
    </div>
  );
}

export default Dashboard;
