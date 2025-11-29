import React, { useState } from "react";
import { analyzeEntry, saveEntry } from "../api/journal";

function AddEntry() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    const result = await analyzeEntry(text);
    setLoading(false);

    const entry = {
      text,
      ...result,
      date: new Date().toLocaleString(),
    };

    saveEntry(entry);
    setResult(entry);
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "450px" }}>
        <h4 className="mb-3">Add Entry</h4>

        <textarea
          rows="7"
          className="form-control mb-3"
          placeholder="Start typing your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn btn-success w-100" onClick={handleSubmit}>
          Submit
        </button>

        {loading && <p className="mt-3 text-center">Analyzing...</p>}

        {result && (
          <div className="mt-4 alert alert-info">
            <p>
              <strong>Summary:</strong> {result.summary}
            </p>
            <p>
              <strong>Suggestion:</strong> {result.suggestion}
            </p>
            <p>
              <strong>Score:</strong> {result.score}
            </p>
            <p>
              <strong>Tags:</strong> {result.tags.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddEntry;
