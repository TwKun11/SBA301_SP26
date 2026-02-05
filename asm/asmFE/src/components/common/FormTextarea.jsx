import React from "react";
import "../../styles/common.css";

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  placeholder,
  rows = 4,
  maxLength,
  ...props
}) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && "*"}
      </label>
      <textarea
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        {...props}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default FormTextarea;
