function Footer({ avatarUrl, authorName, role, email }) {
  return (
    <footer className="bg-light text-dark py-4 mt-auto w-100 border-top">
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <img
              src={avatarUrl}
              alt={`${authorName} avatar`}
              className="rounded-circle"
              width="100"
              height="100"
            />
          </div>

          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5 className="mb-1">Tac gia: &copy; {authorName}</h5>
            <p className="mb-0">{role}</p>
          </div>

          <div className="col-md-4 text-center text-md-start">
            <h5 className="mb-1">Lien he</h5>
            <a
              href={`mailto:${email}`}
              className="text-dark text-decoration-none d-block text-truncate text-nowrap"
              title={email}
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
