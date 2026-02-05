import React from "react";
import "../../styles/common.css";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  error,
  placeholder,
  maxLength,
  ...props
}) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        {...props}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default FormInput;
