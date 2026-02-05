import React from "react";
import "../../styles/common.css";

const Alert = ({ type = "info", message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      {message}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            float: "right",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
