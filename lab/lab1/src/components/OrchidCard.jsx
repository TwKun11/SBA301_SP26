import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

function OrchidCard({
  orchidName,
  description,
  category,
  isSpecial,
  image,
  onDetail,
}) {
  return (
    <Card className="orchid-card h-100 shadow">
      <Card.Img
        variant="top"
        src={image}
        className="orchid-image"
        alt={orchidName}
      />

      <Card.Body>
        <Card.Title className="orchid-title">
          {orchidName}
          {isSpecial && (
            <Badge bg="danger" className="ms-2">
              Special
            </Badge>
          )}
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted orchid-category">
          {category}
        </Card.Subtitle>

        <Card.Text className="orchid-desc">{description}</Card.Text>

        <Button variant="primary" size="sm" onClick={onDetail}>
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
}

export default OrchidCard;
