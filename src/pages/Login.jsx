import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // before auth context was set up -> login code ->

  // const handleLogin = async () => {
  //   try {
  //     // mock login for now
  //     if (isValidEmail(email) && password.length) {
  //       localStorage.setItem("token", "dummy");
  //       navigate("/dashboard");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  //after auth context was set up -> login code ->

  const handleLogin = () => {
    if (isValidEmail(email) && password.length) {
      login("dummy"); //login is a function doing exactly same thing as line 21 above
      navigate("/dashboard");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "420px" }}>
        <h4 className="text-center mb-2">Login</h4>
        <p className="text-center">
          Start Your Journey with <strong>Mood-Journal</strong>
        </p>

        <div className="mb-3 text-start">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
