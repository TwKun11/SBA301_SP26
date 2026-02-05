import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import AccountService from "../services/AccountService";

const Login = () => {
  const [credentials, setCredentials] = useState({
    accountEmail: "",
    accountPassword: "",
  });
  const [errors, setErrors] = useState({
    accountEmail: "",
    accountPassword: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
        general: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ accountEmail: "", accountPassword: "", general: "" });

    // Client-side validation
    const newErrors = {};
    if (!credentials.accountEmail.trim()) {
      newErrors.accountEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.accountEmail)) {
      newErrors.accountEmail = "Email is invalid";
    }

    if (!credentials.accountPassword.trim()) {
      newErrors.accountPassword = "Password is required";
    } else if (credentials.accountPassword.length < 6) {
      newErrors.accountPassword = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    setLoading(true);

    try {
      const response = await AccountService.login(credentials);
      login(response);

      // Redirect based on role
      if (response.accountRole === 1) {
        navigate("/accounts");
      } else {
        navigate("/news");
      }
    } catch (err) {
      setErrors({
        accountEmail: "",
        accountPassword: "",
        general: err.response?.data?.message || "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">FU News Management</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>

              <Form onSubmit={handleSubmit}>
                {errors.general && <Alert variant="danger">{errors.general}</Alert>}

                <Form.Group className="mb-3" controlId="accountEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="accountEmail"
                    placeholder="Enter your email"
                    value={credentials.accountEmail}
                    onChange={handleChange}
                    isInvalid={!!errors.accountEmail}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">{errors.accountEmail}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="accountPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="accountPassword"
                    placeholder="Enter your password"
                    value={credentials.accountPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.accountPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.accountPassword}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading} size="lg">
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
