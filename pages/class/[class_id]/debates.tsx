import React from "react"
import Layout from "components/Layout"
import { GetServerSideProps, NextPage } from "next"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import ClassLayout from "components/ClassLayout"
import Router from "next/router"
import { CheckCircle as CheckCircleIcon, RemoveCircle as RemoveCircleIcon } from "@material-ui/icons"

interface DebatesProps {
  classId: string
}

export const getServerSideProps: GetServerSideProps<DebatesProps> = async context => {
  const { class_id } = context.query
  return {
    props: {
      classId: class_id as string
    }
  }
}

const Debates: NextPage<DebatesProps> = ({ classId }) => {
  return (
    <Layout>
      <ClassLayout classId={classId}>
        <Container fluid="lg" className="mt-4 mb-5" style={{ fontFamily: 'NanumSquare' }} >
          <Row>
            <Col>
              <Card border="light" className="shadow">
                <Card.Header>사회 <small>OOO선생님</small></Card.Header>
                <Card.Body>
                  <div className="d-flex align-items-center pb-2">
                    <Card.Text className="h3 font-weight-bold">사회 문제 토론 </Card.Text>
                    <CheckCircleIcon className="ml-2 mr-1" htmlColor="green" />진행중
                  </div>
                  <Card.Text>우리 일상생활에서 사회 문제에 대해 토론합니다.</Card.Text>
                </Card.Body>
                <Button variant="light" onClick={() => Router.push(`/class/${classId}/debates/asdf`)}>토론 참여하기</Button>
              </Card>
            </Col>
            <Col>
              <Card border="light" className="shadow">
                <Card.Header>국어 <small>XXX선생님</small></Card.Header>
                <Card.Body>
                  <div className="d-flex align-items-center pb-2">
                    <Card.Text className="h3 font-weight-bold">국어 토론 </Card.Text>
                    <RemoveCircleIcon className="ml-2 mr-1" htmlColor="red" />닫힘
                  </div>
                  <Card.Text>국어 토론</Card.Text>
                </Card.Body>
                <Button variant="light">토론 다시보기</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </ClassLayout>
    </Layout>
  )
}

export default Debates