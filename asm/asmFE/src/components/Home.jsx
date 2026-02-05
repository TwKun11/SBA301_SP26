import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "40px 20px",
      }}
    >
      <Container>
        {/* Welcome Header */}
        <Card className="shadow-lg mb-4 border-0" style={{ borderRadius: "20px", overflow: "hidden" }}>
          <div
            style={{
              background: "#4a5568",
              padding: "40px 30px",
              color: "white",
            }}
          >
            <h1 className="display-5 fw-bold mb-3" style={{ fontSize: "2.5rem" }}>
              🗞️ FU News Management System
            </h1>
            <h3 className="mb-0" style={{ fontWeight: "400" }}>
              Welcome back, <strong>{user.accountName}</strong>!
              <Badge
                bg={user.accountRole === 1 ? "danger" : "success"}
                className="ms-3"
                style={{ fontSize: "1rem", padding: "8px 16px" }}
              >
                {user.accountRole === 1 ? "👑 Admin" : "✍️ Staff"}
              </Badge>
            </h3>
          </div>
        </Card>

        {/* Quick Actions Grid */}
        <Row className="g-4">
          {isAdmin() && (
            <Col md={6} lg={4}>
              <Card
                className="h-100 shadow border-0 hover-card"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/accounts")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                }}
              >
                <Card.Body className="p-4 text-center">
                  <div style={{ fontSize: "3rem", marginBottom: "15px" }}>👥</div>
                  <h4 className="fw-bold mb-2">Account Management</h4>
                  <p className="text-muted mb-3">Manage system users and permissions</p>
                  <Button variant="primary" className="w-100" size="lg">
                    Open →
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}

          {isStaff() && (
            <>
              <Col md={6} lg={4}>
                <Card
                  className="h-100 shadow border-0"
                  style={{
                    borderRadius: "15px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/news")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                  }}
                >
                  <Card.Body className="p-4 text-center">
                    <div style={{ fontSize: "3rem", marginBottom: "15px" }}>📰</div>
                    <h4 className="fw-bold mb-2">News Articles</h4>
                    <p className="text-muted mb-3">Create and manage news content</p>
                    <Button variant="primary" className="w-100" size="lg">
                      Open →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={4}>
                <Card
                  className="h-100 shadow border-0"
                  style={{
                    borderRadius: "15px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/categories")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                  }}
                >
                  <Card.Body className="p-4 text-center">
                    <div style={{ fontSize: "3rem", marginBottom: "15px" }}>📁</div>
                    <h4 className="fw-bold mb-2">Categories</h4>
                    <p className="text-muted mb-3">Organize content by categories</p>
                    <Button variant="success" className="w-100" size="lg">
                      Open →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={4}>
                <Card
                  className="h-100 shadow border-0"
                  style={{
                    borderRadius: "15px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/tags")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                  }}
                >
                  <Card.Body className="p-4 text-center">
                    <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🏷️</div>
                    <h4 className="fw-bold mb-2">Tags</h4>
                    <p className="text-muted mb-3">Manage article tags and labels</p>
                    <Button variant="info" className="w-100" size="lg">
                      Open →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>

        {/* Statistics Cards */}
        <Row className="mt-5 g-4">
          <Col md={4}>
            <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <Card.Body className="text-center p-4">
                <div className="text-primary" style={{ fontSize: "2.5rem" }}>
                  📊
                </div>
                <h5 className="mt-3 mb-1">Quick Stats</h5>
                <p className="text-muted small">View system analytics</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <Card.Body className="text-center p-4">
                <div className="text-success" style={{ fontSize: "2.5rem" }}>
                  ⚡
                </div>
                <h5 className="mt-3 mb-1">Fast Access</h5>
                <p className="text-muted small">Navigate easily</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <Card.Body className="text-center p-4">
                <div className="text-warning" style={{ fontSize: "2.5rem" }}>
                  🔒
                </div>
                <h5 className="mt-3 mb-1">Secure</h5>
                <p className="text-muted small">Your data is protected</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
