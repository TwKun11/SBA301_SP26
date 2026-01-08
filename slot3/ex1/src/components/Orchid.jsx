function Orchid({ orchid }) {
  return (
    <article className="card shadow-sm">
      <img
        src={orchid.image}
        className="card-img-top"
        alt={orchid.orchidName}
      />
      <div className="card-body">
        <h2 className="card-title h5 mb-2">{orchid.orchidName}</h2>
        <p className="card-text">{orchid.description}</p>
        <div className="d-flex flex-wrap gap-2">
          <span className="badge text-bg-secondary">{orchid.category}</span>
          {orchid.isSpecial && (
            <span className="badge text-bg-success">Special</span>
          )}
          <span className="badge text-bg-light text-dark">
            ID: {orchid.id}
          </span>
        </div>
      </div>
    </article>
  );
}

export default Orchid;
