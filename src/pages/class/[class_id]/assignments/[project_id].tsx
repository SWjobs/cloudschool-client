import React from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';
import { Assignment } from 'types/classrooms';
import axios from 'axios';
import api from 'datas/api';
import useSWR from 'swr';
import Cookies from 'universal-cookie';
import urljoin from 'url-join';
import { User } from 'types/users';
import ReactMarkdown from 'react-markdown';
import { Menu as MenuIcon } from '@material-ui/icons';
import Link from 'next/link';

interface AssignmentsProps {
  classId: string;
  projectId: string;
}

export const getServerSideProps: GetServerSideProps<AssignmentsProps> = async (
  context
) => {
  const { class_id, project_id } = context.query;
  return {
    props: {
      classId: class_id as string,
      projectId: project_id as string,
    },
  };
};

const Assignments: NextPage<AssignmentsProps> = ({ classId, projectId }) => {
  const { data: assignment } = useSWR<Assignment>(
    new Cookies().get('token')
      ? urljoin(api, `/classrooms/${classId}/assignments/${projectId}`)
      : null,
    (url) =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
          },
        })
        .then((r) => r.data)
  );

  const { data: members } = useSWR<User[]>(
    new Cookies().get('token')
      ? urljoin(api, `/classrooms/${classId}/members`)
      : null,
    (url) =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
          },
        })
        .then((r) => r.data)
  );

  return (
    <Layout>
      <ClassLayout classId={classId}>
        {assignment && members ? (
          <Container fluid="lg" className="mt-4 mb-5">
            <Card style={{ minHeight: '60vh' }} className="shadow-sm">
              <Card.Body>
                <div className="mb-4">
                  <h2 style={{ fontFamily: 'NanumSquare' }}>
                    {assignment.title}
                  </h2>
                  <div>
                    작성자:{' '}
                    {members.find((m) => m.userId === assignment.writerId)
                      ?.name ?? '(알 수 없음)'}
                  </div>
                </div>
                <ReactMarkdown>{assignment.content}</ReactMarkdown>
              </Card.Body>
            </Card>
            <Row className="text-right mt-3">
              <Col>
                <Link href={`/class/${classId}/assignments`} passHref>
                  <Button
                    variant="primary"
                    className="d-inline-flex align-items-center"
                    size="sm"
                  >
                    <MenuIcon className="mr-2" />
                    목록으로
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container
            className="d-flex align-items-center justify-content-center flex-column"
            style={{
              height: '500px',
            }}
          >
            <h3 className="pb-4">불러오는 중</h3>
            <Spinner animation="border" variant="primary" />
          </Container>
        )}
      </ClassLayout>
    </Layout>
  );
};

export default Assignments;
