import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // mock login for now
      if (email.length && password.length) {
        localStorage.setItem("token", "dummy");
        navigate("/dashboard");
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
      <h4>Login</h4>
      <p>
        Start Your Journey with <strong>Mood-Journal</strong>
      </p>
      <div>
        <label htmlFor="email" className="me-2" style={{ width: "90px" }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="me-2" style={{ width: "90px" }}>
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button type="submit" onClick={handleLogin}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
