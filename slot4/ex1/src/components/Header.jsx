import SearchBar from "./SearchBar";

function Header({ searchTerm, onSearchChange }) {
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light border-bottom shadow-sm">
      <div className="container">
        <div className="d-flex w-100 align-items-center gap-3">
          <a className="navbar-brand" href="#">
            Demo
          </a>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
          <div className="ms-auto" style={{ width: 240 }}>
            <SearchBar
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search orchids..."
              formClassName="w-100"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
