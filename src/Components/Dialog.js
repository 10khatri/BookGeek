import React, { useContext, useState } from "react";
import Modal from "react-modal";
import "../Components/react-modal.css";
import { CartContext } from "../context/CartContext";

export function Dialog(props) {
  const { isCheckout, setIsCheckout } = useContext(CartContext);
  const [showModal, setShowModal] = useState(isCheckout);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // const openModal = () => {
  //   setShowModal(true);
  // };

  const closeModal = () => {
    setShowModal(false);
  };

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
        <Modal
          isOpen={showModal}
          shouldCloseOnOverlayClick={false}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            content: {
              position: "relative",
              borderRadius: "5px",
              width: "400px",
              height: "500px",
              padding: "3rem",
              backgroundColor: "white",
            },
          }}
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
        </Modal>
      </div>
    </div>
  );
}
