import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";

function Spinner() {
  const [loading] = useState(true);
  const [color] = useState("#ffe581");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <RingLoader color={color} loading={loading} size={150} />
    </div>
  );
}

export default Spinner;
