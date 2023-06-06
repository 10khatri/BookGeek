import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setEncodedToken, setUser } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleUserName(event) {
    setUserName(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
    setEmailError("");
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function validateEmail(email) {
    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  async function signUp() {
    try {
      if (!validateEmail(email)) {
        setEmailError("Invalid email format");
        return;
      }

      const item = { userName, email, password };
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const result = await response.json();
      const { encodedToken } = result;
      console.log(result);

      console.log(encodedToken);

      setUser({ email: email, name: userName });
      localStorage.setItem("user", JSON.stringify(item));
      localStorage.setItem("encodedToken", encodedToken);
      setEncodedToken(encodedToken);

      setIsLoggedIn(true);
      navigate("/products");
    } catch (error) {
      console.log(error.message[0]);
    }
  }

  return (
    <div>
      <div className="login-container">
        <div
          className="login-form"
          style={{
            borderRadius: "5px",
            width: "400px",
            height: "500px",
            padding: "3rem",
            backgroundColor: "#ffe581",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "-1.8rem",
              right: "-1.1rem",
              borderRadius: "50%",
            }}
            className="close-button"
          >
            <span aria-hidden>×</span>
          </button>
          <h1>Sign up</h1>
          <div className="modal-form">
            <label htmlFor="username">User Name</label>
            <input
              required
              id="username"
              type="text"
              onChange={handleUserName}
              value={userName}
            />
            <label htmlFor="email">Email Id</label>
            <input
              required
              id="email"
              type="text"
              onChange={handleEmail}
              value={email}
            />
            {emailError && <p className="error">{emailError}</p>}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              required
              type="password"
              onChange={handlePassword}
              value={password}
            />
            <button onClick={signUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
