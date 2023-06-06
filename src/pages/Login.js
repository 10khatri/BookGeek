import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setEncodedToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGuestLogin, setIsGuestLogin] = useState(false);

  useEffect(() => {
    if (isGuestLogin) {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuestLogin]);

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleGuestLogin() {
    setEmail("adarshbalika@gmail.com");
    setPassword("adarshbalika");
    setIsGuestLogin(true);
    handleLogin();
  }

  async function handleLogin() {
    try {
      let item = { email, password };
      if (isGuestLogin) {
        item = {
          email: "adarshbalika@gmail.com",
          password: "adarshbalika",
        };
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const result = await response.json();
      const { encodedToken } = result;

      if (response.status === 200 || response.status === 201) {
        setEncodedToken(encodedToken);
        localStorage.setItem("encodedToken", encodedToken);
        setIsLoggedIn(true);
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
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
          <h1>Log In</h1>
          <div className="modal-form">
            <label htmlFor="email">Email Id</label>
            <input
              required
              id="email"
              type="email"
              onChange={handleEmail}
              value={email}
            />
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              type="password"
              onChange={handlePassword}
              value={password}
            />
            <button style={{ display: "inline-block" }} onClick={handleLogin}>
              Login
            </button>
            <button
              style={{ display: "inline-block" }}
              onClick={handleGuestLogin}
            >
              Guest Login
            </button>
            <br />
            <br />
            <span>New user? </span> <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
