import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar as BSNavbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <BSNavbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <BSNavbar.Brand href="/" className="fw-bold">
          FU News Management
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAdmin() && <Nav.Link href="/accounts">Accounts</Nav.Link>}

            {isStaff() && (
              <>
                <Nav.Link href="/categories">Categories</Nav.Link>
                <Nav.Link href="/tags">Tags</Nav.Link>
                <Nav.Link href="/news">News Articles</Nav.Link>
                <Nav.Link href="/profile">My Profile</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="align-items-center">
            <span className="text-white me-3">
              {user.accountName}{" "}
              <Badge bg={user.accountRole === 1 ? "danger" : "success"}>
                {user.accountRole === 1 ? "Admin" : "Staff"}
              </Badge>
            </span>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
