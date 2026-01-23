import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import SearchBar from "./SearchBar";
import HomeCarousel from "./Carousel";
import { useAuth } from "../context/AuthContext";
import { LOGOUT } from "../constants/authActionTypes";
import { useNavigate } from "react-router-dom";

function Header({ onSearch }) {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  return (
    <>
      {/* CAROUSEL Ở TRÊN HEADER */}
      <HomeCarousel />

      {/* HEADER */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">🌸 Orchid Shop</Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            {/* LEFT MENU */}
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="/">Home</Nav.Link>
              {state.user?.role === "ADMIN" && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>

            {/* RIGHT SIDE (SEARCH + LOGIN) */}
            <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2">
              <SearchBar onSearch={onSearch} />

              {/* ✅ Hiển thị nút login nếu chưa đăng nhập */}
              {!state.isAuthenticated && (
                <Button variant="outline-light" href="/login" className="w-100 w-lg-auto">
                  Login
                </Button>
              )}

              {/* ✅ Hiển thị tên user và nút logout khi đã đăng nhập */}
              {state.isAuthenticated && (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="outline-light" id="user-dropdown">
                    👤 {state.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item disabled>
                      <strong>{state.username}</strong>
                      {state.user?.role && <div className="text-muted small">{state.user.role}</div>}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>🚪 Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
