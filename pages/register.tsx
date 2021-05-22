import React from "react";
import Layout from "components/Layout";
import { NextPage } from "next";
import { Container, Col, Form, Row } from "react-bootstrap";

const Register: NextPage = () => {
  return <Layout>
    <Container fluid="sm" className="mt-4" style={{ maxWidth: 900 }}>
      <h3 className="py-5">CloudSchool 회원 가입</h3>
      <Form noValidate>
        <Form.Text className="font-weight-bold pb-2">* 표시는 필수 항목</Form.Text>
        <Row>
          <Form.Label column xs={12} sm={3} md={2}>*아이디:</Form.Label>
          <Col>
            <Form.Group>
              <Form.Control type="text" placeholder="Awesome123" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Label column xs={12} sm={3} md={2}>*패스워드:</Form.Label>
          <Col>
            <Form.Group>
              <Form.Control type="password" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Form.Label column xs={12} sm={3} md={2}>*이름:</Form.Label>
          <Col>
            <Form.Group>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  </Layout>
}

export default Register