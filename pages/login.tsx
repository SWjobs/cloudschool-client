import React from "react";
import Layout from "components/Layout";
import { NextPage } from "next";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import Router from 'next/router'

const Login: NextPage = () => {
  return <Layout>
    <div className="d-flex align-items-center" style={{ height: '75vh' }}>
      <Container fluid="sm" style={{ maxWidth: 400 }}>
        <Form noValidate>
          <h3 className="pb-2">로그인</h3>
          <Form.Group>
            <Form.Control placeholder="아이디" />
          </Form.Group>
          <Form.Group>
            <Form.Control placeholder="패스워드" />
          </Form.Group>
          <Row>
            <Col xs={12} sm={8} className="d-flex pr-3 pr-sm-0">
              <Button variant="success" className="w-100 mb-1">로그인</Button>
            </Col>
            <Col xs={12} sm={4} className="d-flex">
              <Button variant="secondary" className="w-100 mb-1" onClick={() => Router.push('/register', undefined, { shallow: true })}>가입</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  </Layout>
}

export default Login