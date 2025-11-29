import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEntry, getEntries } from "../api/journal";

function Dashboard() {
  // const entries = getEntries();

  const [entries, setEntries] = useState([]);
  useEffect(() => {
    setEntries(getEntries());
  }, []);

  const handleDelete = (idx) => {
    deleteEntry(idx);
    setEntries(getEntries());
  };

  const avgScore = entries.length
    ? Math.round(entries.reduce((a, e) => a + e.score, 0) / entries.length)
    : null;

  return (
    <>
      <h4>Dashboard</h4>
      <Link to="/add-entry">Add New Entry</Link>

      <ul style={{ marginTop: "20px" }}>
        {entries.length === 0 && <p>No entries yet.</p>}

        {avgScore && <h4>Average Mood: {avgScore}/10</h4>}

        {entries.map((e, idx) => (
          <li
            key={idx}
            style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}
          >
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
            <small>{e.date}</small>
            <br />
            <button
              style={{ display: "block", margin: "10px 0" }}
              onClick={() => {
                handleDelete(idx);
              }}
            >
              Delete Entry
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;
