import React from "react";
import "../../styles/common.css";

const SearchBar = ({ value, onChange, onSearch, placeholder = "Search...", onAdd, addButtonText = "Add New" }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="btn btn-primary" onClick={onSearch}>
        Search
      </button>
      {onAdd && (
        <button className="btn btn-success" onClick={onAdd}>
          {addButtonText}
        </button>
      )}
    </div>
  );
};

export default SearchBar;
