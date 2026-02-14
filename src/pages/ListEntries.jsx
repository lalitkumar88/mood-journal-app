import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getEntries, deleteEntry } from "../api/journal";

function ListEntries() {
  const { user } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (user) {
      setEntries(getEntries(user.email));
    }
  }, [user]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this entry?")) {
      deleteEntry(id, user.email);
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  const averageScore = entries.length
    ? (
        entries.reduce((total, entry) => total + entry.score, 0) /
        entries.length
      ).toFixed(1)
    : null;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">All Entries</h3>

      {entries.length > 0 && (
        <div className="alert alert-info">
          <strong>Average Mood Score:</strong> {averageScore} / 10
        </div>
      )}

      {entries.length === 0 && (
        <div className="alert alert-secondary">No entries found.</div>
      )}

      <div className="row">
        {entries.map((entry) => (
          <div className="col-md-6 col-lg-4 mb-4" key={entry.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h6 className="card-subtitle mb-2 text-muted">{entry.date}</h6>

                <p className="card-text">
                  <strong>Summary:</strong> {entry.summary}
                </p>

                <p>
                  <strong>Score:</strong>{" "}
                  <span
                    className={`badge ${
                      entry.score <= 4
                        ? "bg-danger"
                        : entry.score <= 7
                          ? "bg-warning text-dark"
                          : "bg-success"
                    }`}
                  >
                    {entry.score}
                  </span>
                </p>

                <p>
                  <strong>Suggestion:</strong> {entry.suggestion}
                </p>

                <div className="mt-auto">
                  <button
                    className="btn btn-sm btn-outline-danger w-100"
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListEntries;
