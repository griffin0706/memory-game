import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const Modal = ({ modalText, home, modalToggle, setModal }) => {
  return (
    <>
      {modalToggle && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="modal"
        >
          <div className="modal-heading">{modalText}</div>
          <div className="modal-heading2">Play again?</div>
          <div className="modal-button-container">
            <button className="modalBtn" onClick={setModal}>
              Yes
            </button>
            <button className="modalBtn" onClick={home}>
              No
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
