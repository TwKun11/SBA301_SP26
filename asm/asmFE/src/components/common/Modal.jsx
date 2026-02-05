import React from "react";
import "../../styles/common.css";

const Modal = ({ isOpen, onClose, title, children, onSubmit, submitText = "Save", cancelText = "Cancel" }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} type="button">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {cancelText}
            </button>
            <button type="submit" className="btn btn-primary">
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
