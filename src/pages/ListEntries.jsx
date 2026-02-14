import React, { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import { getEntries, deleteEntry } from "../api/journal";

function ListEntries() {
  const { user } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  useEffect(() => {
    if (user) {
      const data = getEntries(user.email);
      setEntries(data);
      setCurrentPage(1); // reset page on user change
    }
  }, [user]);

  //Sort entries by newest date first
  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [entries]);

  //Pagination calculations
  const totalPages = Math.ceil(sortedEntries.length / entriesPerPage);

  const paginatedEntries = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return sortedEntries.slice(startIndex, startIndex + entriesPerPage);
  }, [sortedEntries, currentPage]);

  //Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Delete this entry?")) {
      deleteEntry(id, user.email);

      setEntries((prev) => {
        const updated = prev.filter((entry) => entry.id !== id);

        // Adjust page if last item on page was deleted
        const newTotalPages = Math.ceil(updated.length / entriesPerPage);
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages || 1);
        }

        return updated;
      });
    }
  };

  //Global average score (based on ALL entries)
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
        {paginatedEntries.map((entry) => (
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

      {/* 🔹 Pagination Controls */}
      {totalPages > 1 && (
        <div
          className="d-flex justify-content-between align-items-center m-3 p-3"
          style={{
            backgroundColor: "#f8f9ff",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <button
            className="btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            style={{
              backgroundColor: currentPage === 1 ? "#e0e0e0" : "#4f6df5",
              color: currentPage === 1 ? "#000" : "#fff",
              borderRadius: "8px",
              padding: "6px 16px",
              border: "none",
              transition: "all 0.2s ease",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>

          <span style={{ fontWeight: "500", color: "#333" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            style={{
              backgroundColor:
                currentPage === totalPages ? "#e0e0e0" : "#4f6df5",
              color: currentPage === totalPages ? "#000" : "#fff",
              borderRadius: "8px",
              padding: "6px 16px",
              border: "none",
              transition: "all 0.2s ease",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ListEntries;
