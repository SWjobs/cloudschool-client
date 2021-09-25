import React from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import { Card, Container, Col, Row, Spinner } from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';
import { Assignment } from 'types/classrooms';
import axios from 'axios';
import api from 'datas/api';
import useSWR from 'swr';
import Cookies from 'universal-cookie';
import urljoin from 'url-join';
import { User } from 'types/users';
import Link from 'next/link';

interface AssignmentsProps {
  classId: string;
}

export const getServerSideProps: GetServerSideProps<AssignmentsProps> = async (
  context
) => {
  const { class_id } = context.query;
  return {
    props: {
      classId: class_id as string,
    },
  };
};

const Assignments: NextPage<AssignmentsProps> = ({ classId }) => {
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

  const { data: assignments } = useSWR<Assignment[]>(
    new Cookies().get('token')
      ? urljoin(api, `/classrooms/${classId}/assignments`)
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
        {assignments !== undefined && members !== undefined ? (
          <Container
            fluid="lg"
            className="mt-4 mb-5"
            style={{ fontFamily: 'NanumSquare' }}
          >
            <Row>
              {assignments.map((one) => (
                <Col key={one.projectId}>
                  <Link
                    href={`/class/${classId}/assignments/${one.projectId}`}
                    passHref
                  >
                    <Card className="shadow-sm cursor-pointer">
                      <Card.Body className="py-3">
                        <Card.Title className="mb-1">
                          <div>{one.title}</div>
                        </Card.Title>
                        <small>
                          {one.subject} |{' '}
                          {members.find((m) => m.userId === one.writerId)?.name}
                        </small>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
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
