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
import CategoryService from "../services/CategoryService";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
    parentCategoryId: null,
    isActive: true,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getAllCategories();
      setCategories(data);
      setError("");
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadCategories();
      return;
    }
    try {
      const data = await CategoryService.searchCategories(searchKeyword);
      setCategories(data);
    } catch (err) {
      setError("Search failed");
    }
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setFormData({
      categoryName: "",
      categoryDescription: "",
      parentCategoryId: null,
      isActive: true,
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription || "",
      parentCategoryId: category.parentCategoryId || null,
      isActive: category.isActive,
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleDelete = async (category) => {
    setCategoryToDelete(category);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await CategoryService.deleteCategory(categoryToDelete.categoryId);
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
      setToast({ show: true, message: "Category deleted successfully!", variant: "success" });
      loadCategories();
    } catch (err) {
      setShowDeleteConfirm(false);
      setToast({ show: true, message: err.response?.data?.message || "Failed to delete category", variant: "danger" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    // Validate
    const errors = {};
    if (!formData.categoryName.trim()) {
      errors.categoryName = "Category name is required";
    } else if (formData.categoryName.length > 100) {
      errors.categoryName = "Category name must not exceed 100 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (selectedCategory) {
        await CategoryService.updateCategory(selectedCategory.categoryId, formData);
      } else {
        await CategoryService.createCategory(formData);
      }
      setShowModal(false);
      loadCategories();
    } catch (err) {
      setFormErrors({ general: err.response?.data?.message || "Operation failed" });
    }
  };

  if (loading)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );

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
          <h1 className="display-5 fw-bold text-dark mb-2">📁 Category Management</h1>
          <p className="text-muted">Organize content by categories</p>
        </div>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")} className="shadow">
            {error}
          </Alert>
        )}

        <div className="d-flex gap-2 mb-4">
          <InputGroup style={{ maxWidth: "500px" }}>
            <Form.Control
              type="text"
              placeholder="🔍 Search categories..."
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
            ➕ Add New Category
          </Button>
        </div>

        <div className="card shadow-lg border-0" style={{ borderRadius: "15px", overflow: "hidden" }}>
          <Table striped hover responsive className="mb-0">
            <thead style={{ background: "#48bb78", color: "white" }}>
              <tr>
                <th style={{ padding: "15px" }}>ID</th>
                <th style={{ padding: "15px" }}>Name</th>
                <th style={{ padding: "15px" }}>Description</th>
                <th style={{ padding: "15px" }}>Parent Category</th>
                <th style={{ padding: "15px" }}>Status</th>
                <th style={{ padding: "15px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.categoryId}>
                  <td>{category.categoryId}</td>
                  <td>{category.categoryName}</td>
                  <td>{category.categoryDescription}</td>
                  <td>
                    {category.parentCategoryId
                      ? categories.find((c) => c.categoryId === category.parentCategoryId)?.categoryName || "-"
                      : "-"}
                  </td>
                  <td>
                    <Badge bg={category.isActive ? "success" : "danger"}>
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(category)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(category)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory ? "Edit Category" : "Create Category"}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {formErrors.general && <Alert variant="danger">{formErrors.general}</Alert>}
              <Form.Group className="mb-3">
                <Form.Label>Category Name *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.categoryName}
                  onChange={(e) => {
                    setFormData({ ...formData, categoryName: e.target.value });
                    if (formErrors.categoryName) setFormErrors({ ...formErrors, categoryName: "" });
                  }}
                  isInvalid={!!formErrors.categoryName}
                />
                <Form.Control.Feedback type="invalid">{formErrors.categoryName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.categoryDescription}
                  onChange={(e) => setFormData({ ...formData, categoryDescription: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Parent Category</Form.Label>
                <Form.Select
                  value={formData.parentCategoryId || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, parentCategoryId: e.target.value ? parseInt(e.target.value) : null })
                  }
                  size="5"
                  style={{ height: "auto" }}
                >
                  <option value="">None (Top Level)</option>
                  {categories
                    .filter((cat) => !selectedCategory || cat.categoryId !== selectedCategory.categoryId)
                    .map((cat) => (
                      <option key={cat.categoryId} value={cat.categoryId}>
                        {cat.categoryName}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status *</Form.Label>
                <Form.Select
                  value={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete category <strong>{categoryToDelete?.categoryName}</strong>?
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

export default CategoryManagement;
