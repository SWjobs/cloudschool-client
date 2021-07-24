import React from "react"
import Layout from "components/Layout"
import { GetServerSideProps, NextPage } from "next"
import { Button, Card, Col, Container, ListGroup, Nav, Row, Tab, Tabs } from "react-bootstrap"
import Main from "components/class/Main"
import Notices from "components/class/Notices"
import Assignments from "components/class/Assignments"
import Boards from "components/class/Boards"
import Debates from "components/class/Debates"
import Calendar from "components/class/Calendar"

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
      <Tabs className="justify-content-center p-3" variant="pills" defaultActiveKey="main" id="class-tabs">
        <Tab eventKey="main" title="메인">
          <Container fluid="lg" className="mt-4 mb-5">
            <Main />
          </Container>
        </Tab>
        <Tab eventKey="notices" title="공지">
          <Container fluid="lg" className="mt-4 mb-5">
            <Notices />
          </Container>
        </Tab>
        <Tab eventKey="assignments" title="과제">
          <Container fluid="lg" className="mt-4 mb-5">
            <Assignments />
          </Container>
        </Tab>
        <Tab eventKey="boards" title="게시판">
          <Container fluid="lg" className="mt-4 mb-5">
            <Boards />
          </Container>
        </Tab>
        <Tab eventKey="debates" title="토론">
          <Container fluid="lg" className="mt-4 mb-5">
            <Debates />
          </Container>
        </Tab>
        <Tab eventKey="calendar" title="일정">
          <Container fluid="lg" className="mt-4 mb-5">
            <Calendar />
          </Container>
        </Tab>
      </Tabs>
    </Layout>
  )
}

export default ClassHome