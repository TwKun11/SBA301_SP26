import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirmModal({ show, onHide, onConfirm, itemName }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>⚠️ Xác nhận xóa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn có chắc chắn muốn xóa orchid này?</p>
        {itemName && (
          <div className="alert alert-warning">
            <strong>{itemName}</strong>
          </div>
        )}
        <p className="text-danger mb-0">
          <small>⚠️ Hành động này không thể hoàn tác!</small>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          🗑️ Xác nhận xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
