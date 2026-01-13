import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FilterSort from "./FilterSort";
import Orchid from "./Orchid";

function ListOrchid({ orchids, searchTerm = "" }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const categories = [
    ...new Set(orchids.map((orchid) => orchid.category).filter(Boolean)),
  ];

  const normalizedSearch = searchTerm.trim().toLowerCase();
  let filteredOrchids = orchids.filter(
    (orchid) => !selectedCategory || orchid.category === selectedCategory
  );

  if (normalizedSearch) {
    filteredOrchids = filteredOrchids.filter((orchid) =>
      (orchid.orchidName ?? "").toLowerCase().includes(normalizedSearch)
    );
  }

  if (selectedSort === "price-asc") {
    filteredOrchids.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  } else if (selectedSort === "price-desc") {
    filteredOrchids.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  } else if (selectedSort === "name-asc") {
    filteredOrchids.sort((a, b) =>
      (a.orchidName ?? "").localeCompare(b.orchidName ?? "")
    );
  } else if (selectedSort === "name-desc") {
    filteredOrchids.sort((a, b) =>
      (b.orchidName ?? "").localeCompare(a.orchidName ?? "")
    );
  }

  return (
    <Container className="py-5">
      <FilterSort
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
        onFilterChange={setSelectedCategory}
        onSortChange={setSelectedSort}
      />
      <Row>
        {filteredOrchids.map((orchid) => (
          <Col md={6} lg={3} className="mb-4" key={orchid.id}>
            <Orchid {...orchid} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListOrchid;
