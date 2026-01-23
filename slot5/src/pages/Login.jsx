import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "123456") {
      setError("");
      onLogin(username);
      navigate("/");
      return;
    }
    setError("Username or password is incorrect.");
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setError("");
    navigate("/");
  };

  return (
    <div className="login-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <Card className="login-card shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="login-title mb-2">Welcome Back</h2>
                  <p className="text-muted mb-0">
                    Sign in to view the orchid collection.
                  </p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      autoComplete="username"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </Form.Group>
                  {error && (
                    <div className="login-error mb-3" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="d-flex gap-3">
                    <Button className="login-primary flex-grow-1" type="submit">
                      Login
                    </Button>
                    <Button
                      className="login-cancel flex-grow-1"
                      type="button"
                      variant="outline-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
