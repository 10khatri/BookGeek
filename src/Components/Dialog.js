/*import { Dialog } from "@reach/dialog";

import React from "react";
import "@reach/dialog/styles.css";

import { AuthContext } from "../context/AuthContext";

export function Modal(props) {
  const { setIsLoggedIn, setEncodedToken, isLoggedIn } =
    React.useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  console.log(props.isLoggedIn);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  React.useEffect(() => {
    setShowDialog(isLoggedIn); // Update showDialog whenever isLoggedIn changes
  }, [isLoggedIn]);

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  async function Login() {
    try {
      let item = { email, password };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "adarshbalika@gmail.com",
          password: "adarshbalika",
        }),
      });
      const result = await response.json();
      console.log(result);
      const { encodedToken } = result;
      console.log(encodedToken);

      localStorage.setItem("encodedToken", encodedToken);
      setEncodedToken(encodedToken);
      setIsLoggedIn(true);
      close();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="asda">
      <div className="modal">
        <Dialog
          className="modal-form"
          style={{
            position: "relative",
            borderRadius: "5px",
            width: "400px",
            height: "500px",
            padding: "3rem",
            backgroundColor: "#ffe581",
          }}
          isOpen={showDialog}
          onDismiss={close}
        >
          <button
            style={{
              position: "absolute",
              top: "-1.8rem",
              right: "-1.1rem",
              borderRadius: "50%",
            }}
            className="close-button"
            onClick={close}
          >
            <span aria-hidden>×</span>
          </button>
          <h1>Log In</h1>
          <div className="modal-form">
            <label htmlFor="emial">Eamil Id</label>
            <input id="email" type="text" onChange={handleEmail} />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={handlePassword} />
            <button onClick={Login}>Login</button>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
*/
