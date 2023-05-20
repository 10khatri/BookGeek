import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLoggedIn, setEncodedToken, isLoggedIn, encodedToken, setUser } =
    React.useContext(AuthContext);
  const [isGuestLogin, setIsGuestLogin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleGuestLogin() {
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
        setEmail(item.email);
        setPassword(item.password);
      }
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(item),
      });

      const result = await response.json();
      console.log(result);
      console.log(result.foundUser);
      const { encodedToken, status } = result;

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("encodedToken", encodedToken);
        setEncodedToken(encodedToken);

        setIsLoggedIn(true);
        navigate("/products");
      }
    } catch (error) {
      console.log(error[0]);
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
            <label htmlFor="emial">Eamil Id</label>
            <input
              id="email"
              type="text"
              onChange={handleEmail}
              value={email}
            />
            <label htmlFor="password">Password</label>
            <input
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
