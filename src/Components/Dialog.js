import React, { useContext } from "react";
import { Dialog } from "@reach/dialog";
import { CartContext } from "../context/CartContext";

export function Modal(props) {
  const { isCheckout, setIsCheckout } = useContext(CartContext);
  const [showDialog, setShowDialog] = React.useState(isCheckout);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const handleYes = () => {
    setIsCheckout(true);
    setShowSuccessMessage(true);
    window.location.reload();
  };
  const handleNo = () => {
    setIsCheckout(false);
  };

  return (
    <div>
      <div className="modal">
        <Dialog
          className="modal-form"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "5px",
            width: "400px",
            height: "500px",
            padding: "3rem",
            backgroundColor: "white",
          }}
          isOpen={showDialog}
          onDismiss={() => {}}
        >
          {showSuccessMessage ? (
            <div className="success-message">
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "60px",
                  marginBottom: "60px",
                }}
              >
                Checkout successful!
              </h2>
              <div className="product-buttons">
                <button onClick={handleNo}>
                  <span className="front">Close</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {" "}
              <h1>Checkout Page</h1>
              <div className="modal-content">
                <br />
                <br />
                <h1 style={{ textAlign: "center" }}>
                  Are you sure you want to checkout?
                </h1>
                <div className="product-buttons">
                  <button onClick={handleYes}>
                    <span className="front">Yes</span>
                  </button>
                  <button onClick={handleNo}>
                    <span className="front">No</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </Dialog>
      </div>
    </div>
  );
}
