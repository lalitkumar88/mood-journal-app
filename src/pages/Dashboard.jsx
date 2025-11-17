import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h4>Dashboard</h4>
      <Link to="/add-entry">Add New Entry</Link>
    </>
  );
}

export default Dashboard;
