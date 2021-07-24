import React from "react"
import { Card, Col, ListGroup, Row } from "react-bootstrap"

const Main: React.FC = () => {
  return (
    <Row>
      <Col xs={4}>
        <Card border="light" className="shadow">
          <Card.Header>시간표</Card.Header>
          <Card.Body>
            <Card.Title>1교시 <small>{new Date().toLocaleTimeString()}</small></Card.Title>
            <Card.Text className="h1 font-weight-bold">국어</Card.Text>
            <Card.Text>OOO 선생님</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">다음 교시: 수학 (OOO 선생님)</small>
          </Card.Footer>
        </Card>
      </Col>
      <Col xs={8}>
        <Card border="light" className="shadow">
          <Card.Header>과제</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item action>
              과제 1
            </ListGroup.Item>
            <ListGroup.Item action>
              과제 2
            </ListGroup.Item>
            <ListGroup.Item action>
              과제 3
            </ListGroup.Item>
          </ListGroup>
          <Card.Footer className="text-right">
            <a href="#">더보기</a>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  )
}

export default Main