import React from "react";
import { Button, Modal } from "react-bootstrap";

function ConfirmModal({ show, handleClose, title, body, onConfirm }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-semibold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-4">{body}</Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
