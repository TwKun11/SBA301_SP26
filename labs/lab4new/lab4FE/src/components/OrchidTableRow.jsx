import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { getOrchidId, getOrchidImage } from "../utils/orchidUtils";

/**
 * Orchid Table Row Component
 */
export default function OrchidTableRow({ orchid, onDelete }) {
  const orchidId = getOrchidId(orchid);
  const imageUrl = getOrchidImage(orchid);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this orchid?")) {
      onDelete(orchidId);
    }
  };

  return (
    <tr>
      <td>
        <Image src={imageUrl} rounded width={40} height={40} />
      </td>
      <td>{orchid.name}</td>
      <td>{orchid.category?.categoryName || "N/A"}</td>
      <td>
        {orchid.isNatural ? (
          <span className="badge text-bg-success">Natural</span>
        ) : (
          <span className="badge text-bg-warning">Industry</span>
        )}
      </td>
      <td>
        <Link to={`/edit/${orchidId}`}>
          <i className="bi bi-pencil-square" /> Edit
        </Link>
        <span className="mx-2">|</span>
        <span className="link-danger" role="button" onClick={handleDelete}>
          <i className="bi bi-trash3" /> Delete
        </span>
      </td>
    </tr>
  );
}

OrchidTableRow.propTypes = {
  orchid: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};
