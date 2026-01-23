import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Table, Button, Badge, Toast, ToastContainer, Spinner, Alert } from "react-bootstrap";
import OrchidForm from "../components/OrchidForm";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import orchidService from "../services/orchidService";

export default function Dashboard() {
  const { state } = useAuth();
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingOrchid, setEditingOrchid] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingOrchid, setDeletingOrchid] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });

  const fetchOrchids = async () => {
    try {
      setLoading(true);
      const data = await orchidService.getAllOrchids();
      setOrchids(data);
      setError(null);
    } catch (err) {
      setError("Failed to load orchids. Please make sure the server is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: "", variant: "success" }), 3000);
  };

  const handleAdd = () => {
    setEditingOrchid(null);
    setShowForm(true);
  };

  const handleEdit = (orchid) => {
    setEditingOrchid(orchid);
    setShowForm(true);
  };

  const handleDeleteClick = (orchid) => {
    setDeletingOrchid(orchid);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingOrchid) return;

    try {
      await orchidService.deleteOrchid(deletingOrchid.id);
      setOrchids((prev) => prev.filter((o) => o.id !== deletingOrchid.id));
      showToast("Xóa orchid thành công!", "success");
    } catch (err) {
      showToast("Lỗi khi xóa orchid!", "danger");
      console.error(err);
    } finally {
      setShowDeleteModal(false);
      setDeletingOrchid(null);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingOrchid) {
        const updated = await orchidService.updateOrchid(editingOrchid.id, formData);
        setOrchids((prev) => prev.map((o) => (o.id === editingOrchid.id ? updated : o)));
        showToast("Cập nhật orchid thành công!", "success");
      } else {
        const newOrchid = await orchidService.createOrchid(formData);
        setOrchids((prev) => [...prev, newOrchid]);
        showToast("Thêm orchid mới thành công!", "success");
      }
      setShowForm(false);
      setEditingOrchid(null);
    } catch (err) {
      showToast("Lỗi khi lưu orchid!", "danger");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải dữ liệu...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>🎛️ Admin Dashboard</h1>
          <p className="text-muted">
            Chào mừng, <strong>{state.username}</strong> ({state.user?.role})
          </p>
        </div>
        <Button variant="success" size="lg" onClick={handleAdd}>
          + Thêm Orchid mới
        </Button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">📋 Quản lý Orchids ({orchids.length})</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <Table hover striped className="mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "60px" }}>ID</th>
                  <th style={{ width: "80px" }}>Ảnh</th>
                  <th>Tên Orchid</th>
                  <th>Danh mục</th>
                  <th>Giá</th>
                  <th style={{ width: "100px" }}>Special</th>
                  <th style={{ width: "200px" }} className="text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {orchids.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      Chưa có orchid nào. Nhấn nút "Thêm Orchid mới" để bắt đầu.
                    </td>
                  </tr>
                ) : (
                  orchids.map((orchid) => (
                    <tr key={orchid.id}>
                      <td className="align-middle">{orchid.id}</td>
                      <td className="align-middle">
                        <img
                          src={orchid.image}
                          alt={orchid.orchidName}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/60";
                          }}
                        />
                      </td>
                      <td className="align-middle">
                        <strong>{orchid.orchidName}</strong>
                        <br />
                        <small className="text-muted">{orchid.description?.substring(0, 50)}...</small>
                      </td>
                      <td className="align-middle">
                        <Badge bg="info">{orchid.category}</Badge>
                      </td>
                      <td className="align-middle">
                        <strong>{orchid.price.toLocaleString("vi-VN")} ₫</strong>
                      </td>
                      <td className="align-middle text-center">
                        {orchid.isSpecial ? (
                          <Badge bg="warning" text="dark">
                            ⭐ Special
                          </Badge>
                        ) : (
                          <Badge bg="secondary">Normal</Badge>
                        )}
                      </td>
                      <td className="align-middle text-center">
                        <div className="btn-group" role="group">
                          <Button variant="outline-primary" size="sm" onClick={() => handleEdit(orchid)} title="Sửa">
                            ✏️ Sửa
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteClick(orchid)}
                            title="Xóa"
                          >
                            🗑️ Xóa
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <OrchidForm
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditingOrchid(null);
        }}
        onSubmit={handleSubmit}
        orchid={editingOrchid}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setDeletingOrchid(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={deletingOrchid?.orchidName}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast show={toast.show} onClose={() => setToast({ ...toast, show: false })} bg={toast.variant} autohide>
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}
