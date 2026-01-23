import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, Button, Card } from "react-bootstrap";
import orchidService from "../services/orchidService";

export default function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        setLoading(true);
        const data = await orchidService.getOrchidById(id);
        setOrchid(data);
        setError(null);
      } catch (err) {
        setError("Failed to load orchid details. Please make sure the server is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrchid();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  if (!orchid) return <p>Orchid not found</p>;

  return (
    <Container className="py-5">
      <Card className="shadow-lg p-4 rounded-4">
        <Row className="g-4">
          {/* Cột hình ảnh */}
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <img
              src={orchid.image}
              alt={orchid.orchidName}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
            />
          </Col>

          {/* Cột thông tin */}
          <Col md={6} className="d-flex flex-column justify-content-between">
            <div>
              <h2 className="mb-3">{orchid.orchidName}</h2>
              <p className="text-muted">{orchid.description}</p>
              <p className="fs-5">
                <strong>Price:</strong> <span className="text-success">{orchid.price.toLocaleString("vi-VN")} ₫</span>
              </p>
              <p className="fs-6">
                <strong>Category:</strong> {orchid.category}
              </p>
              {orchid.isSpecial && (
                <Badge bg="warning" text="dark" className="fs-6">
                  Special
                </Badge>
              )}
            </div>

            {/* Nút quay lại */}
            <div className="mt-4">
              <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
                ← Quay lại
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
