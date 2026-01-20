import React, { useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orchid from "./Orchid";
import FilterSort from "./FilterSort";

function ListOrchid({ orchids, searchText }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [sortType, setSortType] = useState("");

  const normalizedSearch = (searchText || "").trim().toLowerCase();

  const categories = useMemo(
    () => [...new Set(orchids.map((o) => o.category))],
    [orchids]
  );

  const filteredOrchids = useMemo(
    () =>
      orchids
        .filter((o) => o.orchidName.toLowerCase().includes(normalizedSearch))
        .filter((o) => filterCategory === "" || o.category === filterCategory),
    [orchids, normalizedSearch, filterCategory]
  );

  const sortedOrchids = useMemo(() => {
    const sorted = [...filteredOrchids];
    sorted.sort((a, b) => {
      if (sortType === "price-asc") return a.price - b.price;
      if (sortType === "price-desc") return b.price - a.price;
      if (sortType === "name-asc")
        return a.orchidName.localeCompare(b.orchidName);
      if (sortType === "name-desc")
        return b.orchidName.localeCompare(a.orchidName);
      return 0;
    });
    return sorted;
  }, [filteredOrchids, sortType]);

  return (
    <div className="flex-grow-1">
      <Container className="py-3 py-md-5 px-3 px-md-auto">
        <h2 className="text-center mb-3 mb-md-4 fs-4 fs-md-2">
          Danh sách hoa lan
        </h2>

        <FilterSort
          categories={categories}
          onFilterChange={setFilterCategory}
          onSortChange={setSortType}
        />

        <Row>
          {sortedOrchids.map((orchid) => (
            <Col
              key={orchid.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="py-2 py-md-3 d-flex"
            >
              <Orchid {...orchid} />
            </Col>
          ))}
        </Row>

        {sortedOrchids.length === 0 && (
          <div className="text-center py-5">
            <p>Kh tim thay.</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ListOrchid;
