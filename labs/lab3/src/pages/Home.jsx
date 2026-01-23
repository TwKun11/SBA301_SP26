import { useState, useEffect } from "react";
import { Button, Alert, Spinner, Toast, ToastContainer } from "react-bootstrap";
import ListOrchids from "../components/ListOrchids";
import OrchidForm from "../components/OrchidForm";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import orchidService from "../services/orchidService";
import { useAuth } from "../context/AuthContext";

function Home({ searchKeyword }) {
  const { state } = useAuth();
  const isAdmin = state.user?.role === "ADMIN";

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
        // Update
        const updated = await orchidService.updateOrchid(editingOrchid.id, formData);
        setOrchids((prev) => prev.map((o) => (o.id === editingOrchid.id ? updated : o)));
        showToast("Cập nhật orchid thành công!", "success");
      } else {
        // Create
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
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>🌸 Orchid Store</h1>
          <h3>Chào mừng bạn đến với cửa hàng hoa lan của chúng tôi!</h3>
          {state.isAuthenticated && (
            <p className="text-muted">
              Đăng nhập với: <strong>{state.username}</strong> ({state.user?.role})
            </p>
          )}
        </div>
        {isAdmin && (
          <Button variant="success" size="lg" onClick={handleAdd}>
            + Thêm Orchid mới
          </Button>
        )}
      </div>

      <ListOrchids
        orchids={orchids}
        searchKeyword={searchKeyword}
        onEdit={isAdmin ? handleEdit : null}
        onDelete={isAdmin ? handleDeleteClick : null}
      />

      {isAdmin && (
        <>
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
        </>
      )}

      <ToastContainer position="top-end" className="p-3">
        <Toast show={toast.show} onClose={() => setToast({ ...toast, show: false })} bg={toast.variant} autohide>
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Home;
