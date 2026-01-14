import { Card, Col, Container, Row } from "react-bootstrap";

function About() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h1 className="text-center mb-3">About</h1>
              <p className="text-muted">
                Welcome to the orchid gallery. This project showcases featured
                orchids with details like price, category, and best-seller
                status so you can browse quickly.
              </p>
              <p className="text-muted mb-0">
                Use the filters and search on the home page to narrow by
                category, price, or name. We keep the interface simple so the
                catalog stays the focus.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
