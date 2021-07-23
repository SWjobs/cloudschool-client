import React from 'react'
import Layout from 'components/Layout'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const Classrooms = () => {
  return (
    <Layout>
      <div className="bg-primary" style={{ height: 100 }}>
        <Container fluid="sm" className="d-flex align-items-center h-100">
          <h1 className="text-white" style={{ fontSize: 40 }}>내 학반</h1>
        </Container>
      </div>
      <div className="bg-white" style={{ height: 500, paddingTop: 30 }}>
        <Container fluid="sm">
          <Row className="pb-4 text-right">
            <Col>
              <Button variant="primary" className="shadow">클래스 참가하기</Button>
              <Button variant="outline-primary" className="ml-2 shadow">새 클래스 만들기</Button>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Card bg="light" className="cursor-pointer shadow-sm">
                <Card.Body>
                  <Card.Title>2021 1-1 영어</Card.Title>
                  <Card.Text>2021학년도 1학년 1학기 영어</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default Classrooms