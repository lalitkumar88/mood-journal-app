import React, { useState } from "react";

function AddEntry() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      //fake API response for now

      if (text.trim().length) {
        const fakeResponse = {
          summary: "You seem a bit stressed but trying to stay positive.",
          score: 6,
          tags: ["stressed", "hopeful"],
          suggestion: "Try to take a break.",
        };
        setResult(fakeResponse);
      }
    } catch (e) {
      console.log(e);
    }
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
