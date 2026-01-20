import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import ListOrchid from "../data/ListOfOrchid";
import "./OrchidDetail.css";

function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const orchid = ListOrchid.find((o) => o.id === id);

  if (!orchid) {
    return (
      <Container className="mt-5 text-center">
        <h3>Orchid not found</h3>
        <Button className="mt-3" onClick={() => navigate("/")}>
          Back to list
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-3 my-md-5">
      <h3 className="mb-3 mb-md-4">Orchid Detail</h3>
      <Card className="orchid-detail-card shadow-lg border-0 rounded-4 rounded-md-5">
        <Row className="g-0 align-items-center">
          {/* IMAGE */}
          <Col xs={12} md={6} className="image-wrapper">
            <img
              src={orchid.image}
              alt={orchid.orchidName}
              className="orchid-detail-img"
            />
          </Col>

          {/* INFO */}
          <Col xs={12} md={6} className="p-3 p-md-5">
            {orchid.isSpecial && (
              <Badge
                bg="danger"
                className="mb-2 mb-md-3 px-2 px-md-3 py-1 py-md-2"
              >
                Special Orchid
              </Badge>
            )}

            <h1 className="orchid-title mb-2 mb-md-3 fs-3 fs-md-1">
              {orchid.orchidName}
            </h1>

            <p className="text-muted mb-2">
              Category: <strong>{orchid.category}</strong>
            </p>

            <p className="orchid-description">{orchid.description}</p>

            <h2 className="orchid-price my-3 my-md-4 fs-4 fs-md-2">
              ${orchid.price}
            </h2>

            <div className="d-flex gap-2 gap-md-3">
              <Button
                variant="outline-secondary"
                size="lg"
                className="w-100 w-sm-auto"
                onClick={() => navigate("/")}
              >
                ← Back
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default OrchidDetail;
