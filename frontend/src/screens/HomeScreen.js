import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import products from "../data/products";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
