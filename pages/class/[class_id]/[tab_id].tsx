import React from "react"
import Layout from "components/Layout"
import { GetServerSideProps, NextPage } from "next"
import { Container, Tab, Tabs } from "react-bootstrap"
import Router from "next/router"
import Main from "components/class/Main"
import Notices from "components/class/Notices"
import Assignments from "components/class/Assignments"
import Boards from "components/class/Boards"
import Debates from "components/class/Debates"
import Calendar from "components/class/Calendar"

interface ClassHomeProps {
  classId: string
  tabId: string
}

export const getServerSideProps: GetServerSideProps<ClassHomeProps> = async context => {
  const { class_id, tab_id } = context.query
  return {
    props: {
      classId: class_id as string,
      tabId: tab_id as string
    }
  }
}

const ClassHome: NextPage<ClassHomeProps> = ({ classId, tabId }) => {
  return (
    <Layout>
      <div className="bg-primary" style={{ height: 110 }}>
        <Container fluid="sm" className="h-100 d-flex align-items-center">
          <div className="text-white">
            <h1 style={{ fontSize: 32 }}>2021 1학년 1반</h1>
            <div>2021학년도 1학년 1반 클래스</div>
          </div>
        </Container>
      </div>
      <Tabs 
        className="justify-content-center p-3" 
        variant="pills" 
        defaultActiveKey={['main', 'notices', 'assignments', 'boards', 'debates', 'calendar'].includes(tabId) ? tabId : "main"} 
        id="class-tabs"
        
        onSelect={e => Router.push(`/class/${classId}/${e}`, undefined, { shallow: true })}
      >
        <Tab eventKey="main" title="메인">
          <Main classId={classId} />
        </Tab>
        <Tab eventKey="notices" title="공지">
          <Notices classId={classId} />
        </Tab>
        <Tab eventKey="assignments" title="과제">
          <Assignments classId={classId} />
        </Tab>
        <Tab eventKey="boards" title="게시판">
          <Boards classId={classId} />
        </Tab>
        <Tab eventKey="debates" title="토론">
          <Debates classId={classId} />
        </Tab>
        <Tab eventKey="calendar" title="일정">
          <Calendar classId={classId} />
        </Tab>
      </Tabs>
    </Layout>
  )
}

export default ClassHome