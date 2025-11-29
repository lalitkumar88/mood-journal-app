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
    <div
      style={{
        padding: "40px",
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: "center",
        border: "1px solid brown",
      }}
    >
      <h4>Add Entry Page</h4>

      <div>
        <textarea
          type="text"
          name="text"
          id="text"
          placeholder="Start typing your thoughts here..."
          rows={10}
          cols={30}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {loading && <p>Analyzing...</p>}

      {result && (
        <div style={{ marginTop: "100px" }}>
          <h5>Summary : {result.summary}</h5>
          <p>Suggestions : {result.suggestion}</p>
          <h5>
            Tags involved :{" "}
            {result.tags.map((tag) => (
              <span key={tag}>{tag} </span>
            ))}
          </h5>
          <h5>Score : {result.score}</h5>
        </div>
      )}
    </div>
  );
}

export default AddEntry;
