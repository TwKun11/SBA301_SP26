import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Table,
  Badge,
  Modal,
  Form,
  InputGroup,
  Alert,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import TagService from "../services/TagService";

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
  const [formData, setFormData] = useState({
    tagName: "",
    note: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      setLoading(true);
      const data = await TagService.getAllTags();
      setTags(data);
      setError("");
    } catch (err) {
      setError("Failed to load tags");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadTags();
      return;
    }
    try {
      const data = await TagService.searchTags(searchKeyword);
      setTags(data);
    } catch (err) {
      setError("Search failed");
    }
  };

  const handleCreate = () => {
    setSelectedTag(null);
    setFormData({
      tagName: "",
      note: "",
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleEdit = (tag) => {
    setSelectedTag(tag);
    setFormData({
      tagName: tag.tagName,
      note: tag.note || "",
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleDelete = async (tag) => {
    setTagToDelete(tag);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!tagToDelete) return;
    try {
      await TagService.deleteTag(tagToDelete.tagId);
      setShowDeleteConfirm(false);
      setTagToDelete(null);
      setToast({ show: true, message: "Tag deleted successfully!", variant: "success" });
      loadTags();
    } catch (err) {
      setShowDeleteConfirm(false);
      setToast({ show: true, message: err.response?.data?.message || "Failed to delete tag", variant: "danger" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    // Validate
    const errors = {};
    if (!formData.tagName.trim()) {
      errors.tagName = "Tag name is required";
    } else if (formData.tagName.length > 50) {
      errors.tagName = "Tag name must not exceed 50 characters";
    }
    if (formData.note && formData.note.length > 255) {
      errors.note = "Note must not exceed 255 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (selectedTag) {
        await TagService.updateTag(selectedTag.tagId, formData);
      } else {
        await TagService.createTag(formData);
      }
      setShowModal(false);
      loadTags();
    } catch (err) {
      setFormErrors({ submit: err.response?.data?.message || "Operation failed" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "30px",
      }}
    >
      <Container>
        <div className="mb-4">
          <h1 className="display-5 fw-bold text-dark mb-2">🏷️ Tag Management</h1>
          <p className="text-muted">Manage article tags and labels</p>
        </div>

        {error && (
          <Alert variant="danger" className="shadow">
            {error}
          </Alert>
        )}

        <div className="mb-4 d-flex gap-2">
          <InputGroup style={{ maxWidth: "500px" }}>
            <Form.Control
              type="text"
              placeholder="🔍 Search tags..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              style={{ borderRadius: "10px 0 0 10px", padding: "12px 20px" }}
            />
            <Button variant="primary" onClick={handleSearch} style={{ padding: "12px 24px" }}>
              Search
            </Button>
          </InputGroup>
          <Button
            variant="success"
            onClick={handleCreate}
            style={{ borderRadius: "10px", padding: "12px 24px", fontWeight: "500" }}
          >
            ➕ Create New Tag
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
          </div>
        ) : (
          <div className="card shadow-lg border-0" style={{ borderRadius: "15px", overflow: "hidden" }}>
            <Table striped hover responsive className="mb-0">
              <thead style={{ background: "#ed64a6", color: "white" }}>
                <tr>
                  <th style={{ padding: "15px" }}>ID</th>
                  <th style={{ padding: "15px" }}>Tag Name</th>
                  <th style={{ padding: "15px" }}>Note</th>
                  <th style={{ padding: "15px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag) => (
                  <tr key={tag.tagId}>
                    <td>{tag.tagId}</td>
                    <td>
                      <Badge bg="info">{tag.tagName}</Badge>
                    </td>
                    <td>{tag.note || "-"}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(tag)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(tag)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedTag ? "Edit Tag" : "Create New Tag"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formErrors.submit && <Alert variant="danger">{formErrors.submit}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Tag Name *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.tagName}
                  onChange={(e) => {
                    setFormData({ ...formData, tagName: e.target.value });
                    if (formErrors.tagName) setFormErrors({ ...formErrors, tagName: "" });
                  }}
                  isInvalid={!!formErrors.tagName}
                  maxLength="50"
                />
                <Form.Control.Feedback type="invalid">{formErrors.tagName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.note}
                  onChange={(e) => {
                    setFormData({ ...formData, note: e.target.value });
                    if (formErrors.note) setFormErrors({ ...formErrors, note: "" });
                  }}
                  isInvalid={!!formErrors.note}
                  maxLength="255"
                />
                <Form.Control.Feedback type="invalid">{formErrors.note}</Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {selectedTag ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete tag <strong>{tagToDelete?.tagName}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Toast Notification */}
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
          <Toast
            show={toast.show}
            onClose={() => setToast({ ...toast, show: false })}
            delay={3000}
            autohide
            bg={toast.variant}
          >
            <Toast.Header>
              <strong className="me-auto">{toast.variant === "success" ? "Success" : "Error"}</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </div>
  );
};

export default TagManagement;
