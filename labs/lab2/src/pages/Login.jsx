import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const { state, errors, handleUsernameChange, handlePasswordChange, handleLogin } = useLogin();

  return (
    <div className="login-page">
      <Container className="py-3 py-md-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="login-card shadow-sm border-0">
              <Card.Body className="p-3 p-sm-4">
                <div className="text-center mb-3 mb-md-4">
                  <h2 className="login-title mb-2 fs-4 fs-md-3">Welcome Back</h2>
                  <p className="text-muted mb-0 small">Sign in to view the orchid collection.</p>
                </div>
                <Form noValidate onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={state.formUsername}
                      onChange={(event) => handleUsernameChange(event.target.value)}
                      required
                      minLength={3}
                      size="sm"
                      className="py-2"
                      isInvalid={!!errors.username}
                      isValid={state.formUsername.length >= 3 && !errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username || "Please enter a username (at least 3 characters)."}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Username looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3 mb-md-4" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={state.password}
                      onChange={(event) => handlePasswordChange(event.target.value)}
                      required
                      minLength={6}
                      size="sm"
                      className="py-2"
                      isInvalid={!!errors.password}
                      isValid={state.password.length >= 6 && !errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password || "Please enter a password (at least 6 characters)."}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Password looks good!</Form.Control.Feedback>
                  </Form.Group>
                  {state.error && (
                    <div className="login-error mb-3" role="alert">
                      {state.error}
                    </div>
                  )}
                  <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3">
                    <Button className="login-primary flex-grow-1" type="submit">
                      Login
                    </Button>
                    <Button
                      className="login-cancel flex-grow-1"
                      type="button"
                      variant="outline-secondary"
                      onClick={() => window.history.back()}
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
