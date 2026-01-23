import React, { useState, useMemo } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import FilterSort from "./FilterSort";
import Orchid from "./Orchid";

function ListOrchid({ orchids, searchTerm = "" }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const categories = [
    ...new Set(orchids.map((orchid) => orchid.category).filter(Boolean)),
  ];

  // Use useMemo to optimize filtering and sorting
  const filteredOrchids = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    // Filter by category
    let result = orchids.filter(
      (orchid) => !selectedCategory || orchid.category === selectedCategory
    );

    // Filter by search term
    if (normalizedSearch) {
      result = result.filter((orchid) =>
        (orchid.orchidName ?? "").toLowerCase().includes(normalizedSearch)
      );
    }

    // Sort
    if (selectedSort === "price-asc") {
      result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (selectedSort === "price-desc") {
      result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (selectedSort === "name-asc") {
      result.sort((a, b) =>
        (a.orchidName ?? "").localeCompare(b.orchidName ?? "")
      );
    } else if (selectedSort === "name-desc") {
      result.sort((a, b) =>
        (b.orchidName ?? "").localeCompare(a.orchidName ?? "")
      );
    }

    return result;
  }, [orchids, searchTerm, selectedCategory, selectedSort]);

  return (
    <Container className="py-5">
      <FilterSort
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
        onFilterChange={setSelectedCategory}
        onSortChange={setSelectedSort}
      />

      {filteredOrchids.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h4>Không tìm thấy kết quả</h4>
          <p>Không có hoa lan nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
        </Alert>
      ) : (
        <Row>
          {filteredOrchids.map((orchid) => (
            <Col md={6} lg={3} className="mb-4" key={orchid.id}>
              <Orchid {...orchid} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ListOrchid;
