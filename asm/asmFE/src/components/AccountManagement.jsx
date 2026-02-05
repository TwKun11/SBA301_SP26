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
import AccountService from "../services/AccountService";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
  const [formData, setFormData] = useState({
    accountName: "",
    accountEmail: "",
    accountRole: 2,
    accountPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const data = await AccountService.getAllAccounts();
      setAccounts(data);
      setError("");
    } catch (err) {
      setError("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadAccounts();
      return;
    }
    try {
      const data = await AccountService.searchAccounts(searchKeyword);
      setAccounts(data);
    } catch (err) {
      setError("Search failed");
    }
  };

  const handleCreate = () => {
    setSelectedAccount(null);
    setFormData({
      accountName: "",
      accountEmail: "",
      accountRole: 2,
      accountPassword: "",
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setFormData({
      accountName: account.accountName,
      accountEmail: account.accountEmail,
      accountRole: account.accountRole,
      accountPassword: "",
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleDelete = async (account) => {
    setAccountToDelete(account);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!accountToDelete) return;
    try {
      await AccountService.deleteAccount(accountToDelete.accountId);
      setShowDeleteConfirm(false);
      setAccountToDelete(null);
      setToast({ show: true, message: "Account deleted successfully!", variant: "success" });
      loadAccounts();
    } catch (err) {
      setShowDeleteConfirm(false);
      setToast({ show: true, message: err.response?.data?.message || "Failed to delete account", variant: "danger" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    // Validate
    const errors = {};
    if (!formData.accountName.trim()) errors.accountName = "Name is required";
    if (!formData.accountEmail.trim()) {
      errors.accountEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.accountEmail)) {
      errors.accountEmail = "Email is invalid";
    }
    if (!selectedAccount && !formData.accountPassword.trim()) {
      errors.accountPassword = "Password is required";
    } else if (formData.accountPassword && formData.accountPassword.length < 6) {
      errors.accountPassword = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (selectedAccount) {
        await AccountService.updateAccount(selectedAccount.accountId, formData);
      } else {
        await AccountService.createAccount(formData);
      }
      setShowModal(false);
      loadAccounts();
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
          <h1 className="display-5 fw-bold text-dark mb-2">👥 Account Management</h1>
          <p className="text-muted">Manage system users and permissions</p>
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
              placeholder="🔍 Search accounts..."
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
            ➕ Create New Account
          </Button>
        </div>

        <div className="card shadow-lg border-0" style={{ borderRadius: "15px", overflow: "hidden" }}>
          <Table striped hover responsive className="mb-0">
            <thead style={{ background: "#4a5568", color: "white" }}>
              <tr>
                <th style={{ padding: "15px" }}>ID</th>
                <th style={{ padding: "15px" }}>Name</th>
                <th style={{ padding: "15px" }}>Email</th>
                <th style={{ padding: "15px" }}>Role</th>
                <th style={{ padding: "15px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.accountId}>
                  <td>{account.accountId}</td>
                  <td>{account.accountName}</td>
                  <td>{account.accountEmail}</td>
                  <td>
                    <Badge bg={account.accountRole === 1 ? "danger" : "info"}>
                      {account.accountRole === 1 ? "Admin" : "Staff"}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(account)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(account)}>
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
            <Modal.Title>{selectedAccount ? "Edit Account" : "Create Account"}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {formErrors.general && <Alert variant="danger">{formErrors.general}</Alert>}
              <Form.Group className="mb-3">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => {
                    setFormData({ ...formData, accountName: e.target.value });
                    if (formErrors.accountName) setFormErrors({ ...formErrors, accountName: "" });
                  }}
                  isInvalid={!!formErrors.accountName}
                />
                <Form.Control.Feedback type="invalid">{formErrors.accountName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.accountEmail}
                  onChange={(e) => {
                    setFormData({ ...formData, accountEmail: e.target.value });
                    if (formErrors.accountEmail) setFormErrors({ ...formErrors, accountEmail: "" });
                  }}
                  isInvalid={!!formErrors.accountEmail}
                />
                <Form.Control.Feedback type="invalid">{formErrors.accountEmail}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role *</Form.Label>
                <Form.Select
                  value={formData.accountRole}
                  onChange={(e) => setFormData({ ...formData, accountRole: parseInt(e.target.value) })}
                >
                  <option value="1">Admin</option>
                  <option value="2">Staff</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password {selectedAccount ? "(leave blank to keep current)" : "*"}</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.accountPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, accountPassword: e.target.value });
                    if (formErrors.accountPassword) setFormErrors({ ...formErrors, accountPassword: "" });
                  }}
                  isInvalid={!!formErrors.accountPassword}
                />
                <Form.Control.Feedback type="invalid">{formErrors.accountPassword}</Form.Control.Feedback>
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
            Are you sure you want to delete account <strong>{accountToDelete?.accountName}</strong>?
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

export default AccountManagement;
