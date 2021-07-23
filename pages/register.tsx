import React from "react";
import Layout from "components/Layout";
import { NextPage } from "next";
import { Container, Col, Form, Row, Button } from "react-bootstrap";

const Register: NextPage = () => {
  return <Layout>
    <Container fluid="sm" className="my-5" style={{ maxWidth: 900, minHeight: '70vh' }}>
      <h3 className="mb-5">CloudSchool 회원 가입</h3>
      <Form noValidate>
        <Row>
          <Form.Label column xs={12} sm={3} md={2}>아이디:</Form.Label>
          <Col>
            <Form.Group>
              <Form.Control type="text" placeholder="아이디" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Label column xs={12} sm={3} md={2}>패스워드:</Form.Label>
          <Col>
            <Form.Group>
              <Form.Control type="password" placeholder="패스워드" />
            </Form.Group>
          </Col>
        </Row> 
        <Row>
          <Form.Label column xs={12} sm={3} md={2}>조직 이름:</Form.Label>
          <Col>
            <Form.Group>
              <Form.Control type="text" placeholder="학교/회사 등" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="w-100 text-right">
            <Button variant="success" style={{width: 160}}>
              회원가입
            </Button>
          </Col>
        </Row>
      </Form>
  
    </Container>
  </Layout>
}

export default Register