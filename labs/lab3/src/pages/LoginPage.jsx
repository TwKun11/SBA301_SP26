import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";
import { SET_EMAIL, SET_PASSWORD } from "../constants/authActionTypes";

export default function LoginPage() {
  const { state, dispatch, handleSubmit } = useLogin();
  const { email, password, loading, error } = state;

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <Card className="p-4 shadow">
            <h3 className="text-center">Đăng nhập</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Control
                className="mb-3"
                placeholder="Username or Email"
                value={email}
                onChange={(e) =>
                  dispatch({ type: SET_EMAIL, payload: e.target.value })
                }
              />

              <Form.Control
                type="password"
                className="mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  dispatch({ type: SET_PASSWORD, payload: e.target.value })
                }
              />

              <Button className="w-100" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Đăng nhập"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
