import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function User() {
  const { user } = React.useContext(AuthContext);
  const [address, setAddress] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAddress = {
      street: street,
      city: city,
      state: state,
      zip: zip,
    };
    setAddress(newAddress);
    setStreet("");
    setCity("");
    setState("");
    setZip("");
  };

  const handleDelete = () => {
    setAddress(null);
  };

  return (
    <div style={{ padding: "10rem" }}>
      <h1>Welcome {user.name}</h1>
      <h1 style={{ paddingTop: "15px" }}>Email {user.email}</h1>

      {address ? (
        <div className="address" style={{ paddingTop: "15px" }}>
          <h1>Address:</h1>
          <h2>
            <strong>Street:</strong> {address.street}
          </h2>
          <h2>
            <strong>City:</strong> {address.city}
          </h2>
          <h2>
            <strong>State:</strong> {address.state}
          </h2>
          <h2>
            <strong>ZIP Code:</strong> {address.zip}
          </h2>
          <button onClick={handleDelete}>Delete Address</button>
        </div>
      ) : (
        <div className="address">
          <form onSubmit={handleSubmit}>
            <h1>Add Address:</h1>
            <div>
              <label>Street:</label>
              <input
                type="text"
                value={street}
                onChange={(event) => setStreet(event.target.value)}
                required
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
              />
            </div>
            <div>
              <label>State:</label>
              <input
                type="text"
                value={state}
                onChange={(event) => setState(event.target.value)}
                required
              />
            </div>
            <div>
              <label>ZIP Code:</label>
              <input
                type="text"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
