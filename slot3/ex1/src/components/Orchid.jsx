import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Orchid({ orchidName, description, category, isSpecial, image }) {
  return (
    <div>
      <Container className="py-5">
        <Row>
          <Col>
            <Card className="orchid-card">
              <Card.Img variant="top" src={image} className="orchid-image" />

              <Card.Body>
                <Card.Title className="orchid-title">{orchidName}</Card.Title>

                <Card.Subtitle className="orchid-category">
                  {category}
                </Card.Subtitle>

                <Card.Text className="orchid-desc">{description}</Card.Text>

                {isSpecial && (
                  <span className="special-badge">Special Orchid</span>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Orchid;
