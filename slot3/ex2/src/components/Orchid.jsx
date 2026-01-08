import React from "react";
import { Card, Badge } from "react-bootstrap";

function Orchid({ orchidName, description, category, isSpecial, image }) {
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
      </Card.Body>
    </Card>
  );
}

export default Orchid;
