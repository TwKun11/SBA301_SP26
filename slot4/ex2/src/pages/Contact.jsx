import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ConfirmModal from "../components/ConfirmModal";

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  agree: false,
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [validated, setValidated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    if (!formElement.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setForm(initialForm);
    setValidated(false);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h1 className="text-center mb-2">Contact</h1>
              <p className="text-muted text-center mb-4">
                Tell us about your needs and we will get back to you shortly.
              </p>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="contactFirstName">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your first name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="contactLastName">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your last name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="contactPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        pattern="^[0-9]{9,11}$"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid phone number (9-11 digits).
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="contactEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="contactAgree" className="mb-3">
                  <Form.Check
                    required
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    label="I agree to be contacted."
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        title="Confirm submission"
        body={
          <div>
            <p className="mb-2">Please confirm your information:</p>
            <ul className="mb-0">
              <li>First name: {form.firstName}</li>
              <li>Last name: {form.lastName}</li>
              <li>Phone: {form.phone}</li>
              <li>Email: {form.email}</li>
              <li>Agree: {form.agree ? "Yes" : "No"}</li>
            </ul>
          </div>
        }
        onConfirm={handleConfirm}
      />
    </Container>
  );
}

export default Contact;
