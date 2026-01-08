import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

function OrchidCard({
  orchidName,
  shortDesc,
  category,
  isSpecial,
  image,
  priceText,
  onDetail,
}) {
  return (
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
          {priceText && (
            <div className="fw-bold" style={{ whiteSpace: "nowrap" }}>
              {priceText}
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
          <Button variant="outline-primary" size="sm" onClick={onDetail}>
            Xem chi tiết
          </Button>
          <Button variant="primary" size="sm">
            Mua ngay
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default OrchidCard;
