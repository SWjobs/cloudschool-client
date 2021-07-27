import React from "react"
import Layout from "components/Layout"
import { GetServerSideProps, NextPage } from "next"
import { Container, Row } from "react-bootstrap"
import ClassLayout from "components/ClassLayout"

interface AssignmentsProps {
  classId: string
}

export const getServerSideProps: GetServerSideProps<AssignmentsProps> = async context => {
  const { class_id } = context.query
  return {
    props: {
      classId: class_id as string
    }
  }
}

const Assignments: NextPage<AssignmentsProps> = ({ classId }) => {
  return (
    <Layout>
      <ClassLayout classId={classId}>
        <Container fluid="lg" className="mt-4 mb-5" style={{ fontFamily: 'NanumSquare' }} >
          <Row>

          </Row>
        </Container>
      </ClassLayout>
    </Layout>
  )
}

export default Assignments