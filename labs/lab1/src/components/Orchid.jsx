import React, { useMemo, useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import OrchidCard from "./OrchidCard";

function formatVND(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
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

  const priceText = price != null ? formatVND(price) : "";

  const cardProps = {
    orchidName,
    shortDesc,
    category,
    isSpecial,
    image,
    priceText,
    onDetail: () => setShowDetail(true),
  };

  return (
    <>
      <OrchidCard {...cardProps} />

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
            {priceText && <div className="fw-bold">{priceText}</div>}
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
