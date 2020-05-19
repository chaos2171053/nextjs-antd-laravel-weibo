import React from "react";
import config from "../config/config";
import { Container, Col, Row } from "react-bootstrap";
const Footer = () => (
  <Container>
    <Row className="float-right">
      <Col>
        © <span>{new Date().getFullYear()} | </span>
        <span className="author">{config.theme.author}</span>
      </Col>
    </Row>
  </Container>
);

export default Footer;
