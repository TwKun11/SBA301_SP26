import React from "react";
import { Form } from "react-bootstrap";

function SearchBar({
  value,
  onChange,
  placeholder = "Search orchids...",
  formClassName = "",
}) {
  return (
    <Form className={`mb-0 ${formClassName}`.trim()}>
      <Form.Group controlId="searchOrchids" className="mb-0">
        <Form.Label className="visually-hidden">Search</Form.Label>
        <Form.Control
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          size="sm"
        />
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
