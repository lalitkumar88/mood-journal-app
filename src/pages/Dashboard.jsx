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
      <ul className="list-group mt-4">
        {entries.length === 0 && (
          <div className="alert alert-secondary">No entries yet.</div>
        )}

        {entries.map((e) => (
          <li className="list-group-item" key={e.id}>
            <p>
              <strong>Question:</strong> {e.text}
            </p>
            <p>
              <strong>Summary:</strong> {e.summary}
            </p>
            <p>
              <strong>Suggestion:</strong> {e.suggestion}
            </p>
            <p>
              <strong>Score:</strong> {e.score}
            </p>
            <small className="text-muted">{e.date}</small>

            <div className="mt-2">
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(e.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;
