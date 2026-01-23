import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Orchid({ orchid, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/orchid/${orchid.id}`);
  };

  return (
    <div className="orchid-card">
      <div className="img-wrapper">
        <img src={orchid.image} alt={orchid.orchidName} />
      </div>

      <h3>{orchid.orchidName}</h3>

      <p className="price">{orchid.price.toLocaleString("vi-VN")} ₫</p>

      <p className="category">{orchid.category}</p>

      {orchid.isSpecial && <span className="badge">Special</span>}

      <div className="d-flex gap-2 mt-2">
        <Button onClick={handleViewDetail} variant="info" size="sm" className="flex-fill">
          Xem chi tiết
        </Button>
        {onEdit && (
          <Button onClick={() => onEdit(orchid)} variant="warning" size="sm">
            Sửa
          </Button>
        )}
        {onDelete && (
          <Button onClick={() => onDelete(orchid.id)} variant="danger" size="sm">
            Xóa
          </Button>
        )}
      </div>
    </div>
  );
}
