// modal.jsx

import React from "react";
import "./modal.css";

const Modal = ({
  showModal,
  setShowModal,
  modalText,
  confirmAction,
  isLoginPage,
}) => {
  return (
    <div className={`modal-background ${showModal ? "active" : ""}`}>
      <div className={`modal-box ${showModal ? "active" : ""}`}>
        <p>{modalText}</p>
        <div className="button-container">
          {isLoginPage ? (
            <>
              <button
                className="btncancelar-login"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button className="btnentrar" onClick={confirmAction}>
                Entrar
              </button>
            </>
          ) : (
            <>
              <button className="btnnao" onClick={() => setShowModal(false)}>
                Não
              </button>
              <button className="btnsair" onClick={confirmAction}>
                Sim
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
