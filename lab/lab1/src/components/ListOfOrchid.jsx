import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orchid from "./Orchid";
import listOrchids from "../listOrchids";
function ListOrchid() {
  return (
    <Container className="py-5">
      <Row>
        {listOrchids.map((orchid) => (
          <Col md={6} lg={3} className="mb-4" key={orchid.id}>
            <Orchid
              orchidName={orchid.orchidName}
              description={orchid.description}
              category={orchid.category}
              isSpecial={orchid.isSpecial}
              image={orchid.image}
              price={orchid.price}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListOrchid;
