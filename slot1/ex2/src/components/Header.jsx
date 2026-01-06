function Header({ currentPage, onNavigate }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavigate = (event, page) => {
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container d-flex justify-content-center">
        <div className="d-flex w-100 align-items-center">
          <a
            className="navbar-brand mx-auto"
            href="#"
            onClick={(event) => handleNavigate(event, "home")}
          >
            Demo
          </a>
          <ul className="navbar-nav mx-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.id}>
                <a
                  className={`nav-link ${currentPage === link.id ? "active" : ""}`}
                  href="#"
                  onClick={(event) => handleNavigate(event, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
