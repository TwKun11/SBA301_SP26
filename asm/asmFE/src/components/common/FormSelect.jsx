import React from "react";
import "../../styles/common.css";

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
  placeholder = "Select...",
  ...props
}) => {
  return (
    <div className="form-group">
      <label>
        {label} {required && "*"}
      </label>
      <select name={name} className="form-control" value={value} onChange={onChange} required={required} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default FormSelect;
