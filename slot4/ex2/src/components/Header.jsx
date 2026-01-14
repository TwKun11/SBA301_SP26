import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function Header({ onSearch }) {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="site-header">
      <Container>
        <Navbar.Brand as={Link} to="/">Orchid Shop</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              className="header-search"
              type="search"
              placeholder="Search orchid..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
