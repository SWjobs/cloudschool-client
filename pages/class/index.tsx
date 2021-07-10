import React from 'react'
import Layout from 'components/Layout'
import { Card, Col, Container, Row } from 'react-bootstrap'

const Classrooms = () => {
  return (
    <Layout>
      <div className="bg-primary" style={{ height: 100 }}>
        <Container fluid="sm" className="d-flex align-items-center h-100">
          <h1 className="text-white" style={{ fontSize: 40 }}>Classrooms</h1>
        </Container>
      </div>
      <div className="bg-white" style={{ height: 500, paddingTop: 50 }}>
        <Container fluid="sm">
          <Row>
            <Col xs={4}>
              <Card bg="light">
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