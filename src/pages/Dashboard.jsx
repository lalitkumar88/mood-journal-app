import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEntry, getEntries } from "../api/journal";
import { AuthContext } from "../context/AuthContext";
import MoodChart from "../components/MoodChart";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    if (user) {
      setEntries(getEntries(user.email));
    }
  }, [user]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteEntry(id, user.email);
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  const avgScore = entries.length
    ? Math.round(entries.reduce((a, e) => a + e.score, 0) / entries.length)
    : null;

  return (
    <>
      <h4>Dashboard</h4>
      <Link to="/add-entry">Add New Entry</Link>

      <MoodChart />
    </>
  );
}

export default Dashboard;
