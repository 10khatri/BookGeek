import { Dialog } from "@reach/dialog";

import React from "react";
import "@reach/dialog/styles.css";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export function Modal(props) {
  const { isCheckout } = React.useContext(CartContext);
  const [showDialog, setShowDialog] = React.useState(isCheckout);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div>
      <div className="modal">
        <Dialog
          className="modal-form"
          style={{
            marginTop: "10rem",
            position: "relative",
            borderRadius: "5px",
            width: "400px",
            height: "500px",
            padding: "3rem",
            backgroundColor: "white",
          }}
          isOpen={showDialog}
          onDismiss={close}
        >
          <h1>Checkout Page</h1>
          <div className="modal-content">
            <br />
            <br />
            <h1 style={{ textAlign: "center" }}>
              Arey you sure you want to checkout?
            </h1>
            <div className="product-buttons">
              <button>
                <span className="front">Yes</span>
              </button>
              <button>
                <span className="front">No</span>
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
