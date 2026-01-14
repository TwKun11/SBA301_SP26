import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header({ searchTerm, onSearchChange }) {
  const location = useLocation();
  const showSearch = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light border-bottom shadow-sm">
      <div className="container">
        <div className="d-flex w-100 align-items-center gap-3">
          <NavLink className="navbar-brand" to="/">
            Demo
          </NavLink>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="ms-auto" style={{ width: 240 }}>
            {showSearch ? (
              <SearchBar
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Search orchids..."
                formClassName="w-100"
              />
            ) : (
              <div className="w-100" style={{ height: 30 }} aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
