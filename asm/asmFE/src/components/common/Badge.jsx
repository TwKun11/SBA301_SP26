import React from "react";
import "../../styles/common.css";

const Badge = ({ type = "info", children }) => {
  return <span className={`badge badge-${type}`}>{children}</span>;
};

export default Badge;
