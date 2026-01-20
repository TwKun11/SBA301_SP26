import { useEffect, useReducer } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import CarouselBanner from "./CarouselBanner";
import { useLogin } from "../hooks/useLogin";

// Header reducer cho menu state
const headerReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { ...state, menuOpen: !state.menuOpen };
    case "CLOSE_MENU":
      return { ...state, menuOpen: false };
    default:
      return state;
  }
};

function Header({ searchText, onSearchChange }) {
  const navigate = useNavigate();
  const { state: loginState, handleLogout } = useLogin();

  // useReducer cho menu toggle state
  const [state, dispatch] = useReducer(headerReducer, { menuOpen: false });

  useEffect(() => {
    // Listen to localStorage changes for multi-tab sync
    const checkLoginStatus = () => {
      window.dispatchEvent(new Event("storage"));
    };

    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const onLogoutClick = () => {
    handleLogout();
    dispatch({ type: "CLOSE_MENU" });
    navigate("/");
  };

  const handleMenuToggle = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  const closeMenu = () => {
    dispatch({ type: "CLOSE_MENU" });
  };

  return (
    <>
      {/* Carousel Component */}
      <div className="home-page">
        <CarouselBanner />
      </div>

      <Navbar
        bg="light"
        expand="lg"
        className="site-header shadow-sm"
        expanded={state.menuOpen}
        onToggle={handleMenuToggle}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4" onClick={closeMenu}>
            🌸 FlowerShop
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" onClick={closeMenu}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={closeMenu}>
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={closeMenu}>
                Contact
              </Nav.Link>
            </Nav>

            {/* Search form - responsive width */}
            <Form className="d-flex my-2 my-lg-0 mx-lg-3 w-100">
              <Form.Control
                type="search"
                placeholder="Search orchid..."
                value={searchText}
                onChange={(e) => onSearchChange(e.target.value)}
                size="sm"
                className="header-search rounded-pill"
              />
            </Form>

            <Nav className="ms-lg-0">
              {loginState.isLoggedIn ? (
                <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2">
                  <Nav.Link className="text-success fw-semibold mb-0 fs-6">Xin chào, {loginState.username}</Nav.Link>
                  <Nav.Link onClick={onLogoutClick} className="text-danger fw-semibold fs-6" role="button">
                    Đăng Xuất
                  </Nav.Link>
                </div>
              ) : (
                <Nav.Link as={Link} to="/login" className="text-success fw-semibold fs-6" onClick={closeMenu}>
                  Đăng Nhập
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
