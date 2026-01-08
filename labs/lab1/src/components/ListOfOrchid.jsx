import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orchid from "./Orchid";

function ListOrchid({ orchids }) {
  return (
    <Container className="py-5">
      <Row>
        {orchids.map((orchid) => (
          <Col md={6} lg={3} className="mb-4" key={orchid.id}>
            <Orchid {...orchid} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListOrchid;
