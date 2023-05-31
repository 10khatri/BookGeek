import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLoggedIn, setEncodedToken, isLoggedIn, setUser, user } =
    React.useContext(AuthContext);
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleUserName(event) {
    setUserName(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  async function signUp() {
    try {
      let item = { userName, email, password };
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   email: "adarshbalika@gmail.com",
        //   password: "adarshbalika",
        // }),
        body: JSON.stringify(item),
      });
      const result = await response.json();
      console.log(result.createdUser);
      const { encodedToken } = result;

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
              id="username"
              type="text"
              onChange={handleUserName}
              value={userName}
            />
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
            <button onClick={signUp}>sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
