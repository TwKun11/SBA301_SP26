import { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const CATEGORIES = ["Dendrobium", "Phalaenopsis", "Cattleya", "Oncidium", "Vanda"];

export default function OrchidForm({ show, onHide, onSubmit, orchid = null }) {
  const [formData, setFormData] = useState({
    orchidName: "",
    description: "",
    category: "",
    isSpecial: false,
    price: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (orchid) {
      setFormData(orchid);
    } else {
      setFormData({
        orchidName: "",
        description: "",
        category: "",
        isSpecial: false,
        price: "",
        image: "",
      });
    }
    setErrors({});
  }, [orchid, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.orchidName.trim()) newErrors.orchidName = "Tên lan không được để trống";
    if (!formData.description.trim()) newErrors.description = "Mô tả không được để trống";
    if (!formData.category) newErrors.category = "Vui lòng chọn danh mục";
    if (!formData.price || formData.price <= 0) newErrors.price = "Giá phải lớn hơn 0";
    if (!formData.image.trim()) newErrors.image = "URL hình ảnh không được để trống";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    onSubmit(submitData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{orchid ? "Cập nhật Orchid" : "Thêm Orchid mới"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên Orchid *</Form.Label>
                <Form.Control
                  type="text"
                  name="orchidName"
                  value={formData.orchidName}
                  onChange={handleChange}
                  isInvalid={!!errors.orchidName}
                  placeholder="Nhập tên orchid"
                />
                <Form.Control.Feedback type="invalid">{errors.orchidName}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Danh mục *</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                >
                  <option value="">Chọn danh mục</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              placeholder="Nhập mô tả chi tiết"
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Giá (VNĐ) *</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                  placeholder="Nhập giá"
                  min="0"
                />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>URL Hình ảnh *</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  isInvalid={!!errors.image}
                  placeholder="Nhập URL hình ảnh"
                />
                <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="isSpecial"
              label="Đánh dấu là Special"
              checked={formData.isSpecial}
              onChange={handleChange}
            />
          </Form.Group>

          {formData.image && (
            <div className="mb-3 text-center">
              <img
                src={formData.image}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              {orchid ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
