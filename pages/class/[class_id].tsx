import React from "react"
import Layout from "components/Layout"
import { GetServerSideProps, NextPage } from "next"
import { Button, Card, Col, Container, ListGroup, Nav, Row } from "react-bootstrap"

interface ClassHomeProps {
  classId: string
}

export const getServerSideProps: GetServerSideProps<ClassHomeProps> = async context => {
  const { class_id } = context.query
  return {
    props: {
      classId: class_id as string
    }
  }
}

const ClassHome: NextPage<ClassHomeProps> = ({ classId }) => {
  return (
    <Layout>
      <div className="bg-primary" style={{ height: 80 }}>
        <Container fluid="sm" className="d-flex align-items-center h-100">
          <h1 className="text-white" style={{ fontSize: 32 }}>2021 1-1 영어</h1>
        </Container>
      </div>
      <Nav className="justify-content-center p-3" variant="pills" defaultActiveKey="main">
        <Nav.Item>
          <Nav.Link eventKey="main">메인</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="notices">공지</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="assignments">과제</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="boards">게시판</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="debates">토론</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="calandar">일정</Nav.Link>
        </Nav.Item>
      </Nav>

      <Container fluid="lg" className="mt-4 mb-5">
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
      </Container>
    </Layout>
  )
}

export default ClassHome