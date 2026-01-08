import React, { useMemo, useState } from "react";
import { Card, Badge, Button, Modal } from "react-bootstrap";

function formatVND(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + "₫";
}

function Orchid({
  orchidName,
  description,
  category,
  isSpecial,
  image,
  price,
}) {
  const [showDetail, setShowDetail] = useState(false);

  const shortDesc = useMemo(() => {
    if (!description) return "";
    return description.length > 80
      ? description.slice(0, 80) + "..."
      : description;
  }, [description]);

  return (
    <>
      <Card className="h-100 border-0 shadow-sm overflow-hidden">
        <div style={{ position: "relative" }}>
          <Card.Img
            variant="top"
            src={image}
            alt={orchidName}
            style={{ height: 210, objectFit: "cover" }}
          />
          {isSpecial && (
            <Badge
              bg="danger"
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                padding: "6px 10px",
                borderRadius: 999,
              }}
            >
              Best Seller
            </Badge>
          )}
        </div>

        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <Card.Title className="mb-1" style={{ fontSize: 18 }}>
              {orchidName}
            </Card.Title>
            {price != null && (
              <div className="fw-bold" style={{ whiteSpace: "nowrap" }}>
                {formatVND(price)}
              </div>
            )}
          </div>

          <div className="text-muted mb-2" style={{ fontSize: 13 }}>
            {category}
          </div>

          <Card.Text className="text-secondary mb-3" style={{ fontSize: 14 }}>
            {shortDesc}
          </Card.Text>

          <div className="mt-auto d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setShowDetail(true)}
            >
              Xem chi tiết
            </Button>
            <Button variant="primary" size="sm">
              Mua ngay
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showDetail} onHide={() => setShowDetail(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            {orchidName}
            {isSpecial && <Badge bg="danger">Best Seller</Badge>}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            src={image}
            alt={orchidName}
            className="img-fluid rounded mb-3"
          />

          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="text-muted">{category}</div>
            {price != null && <div className="fw-bold">{formatVND(price)}</div>}
          </div>

          <p className="mb-0">{description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetail(false)}>
            Đóng
          </Button>
          <Button variant="primary">Thêm vào giỏ</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Orchid;
