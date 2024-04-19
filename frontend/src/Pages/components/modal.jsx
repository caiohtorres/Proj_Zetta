import React from "react";
import "./modal.css";

const Modal = ({ showModal, confirmLogout, setShowModal }) => {
  return (
    <div className={`modal-background ${showModal ? "active" : ""}`}>
      <div className={`modal-box ${showModal ? "active" : ""}`}>
        <p>Deseja realmente sair?</p>
        <div className="button-container">
          <button className="btnsair" onClick={confirmLogout}>
            Sim
          </button>
          <button className="btnnao" onClick={() => setShowModal(false)}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
