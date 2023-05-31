import React from "react";
import { AuthContext } from "../context/AuthContext";
export default function User() {
  const { user } = React.useContext(AuthContext);
  console.log(localStorage.getItem("user"));
  return (
    <div style={{ padding: "10rem" }}>
      <h1>welcome {user.name}</h1>
      <h1>email {user.email}</h1>
    </div>
  );
}
