import React from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';
import Router from 'next/router';
import {
  CheckCircle as CheckCircleIcon,
  RemoveCircle as RemoveCircleIcon,
} from '@material-ui/icons';
import { Debate } from 'types/classrooms';
import axios from 'axios';
import api from 'datas/api';
import useSWR from 'swr';
import { User } from 'types/users';
import Cookies from 'universal-cookie';
import urljoin from 'url-join';

interface DebatesProps {
  classId: string;
}

export const getServerSideProps: GetServerSideProps<DebatesProps> = async (
  context
) => {
  const { class_id } = context.query;
  return {
    props: {
      classId: class_id as string,
    },
  };
};

const Debates: NextPage<DebatesProps> = ({ classId }) => {
  const { data: debates } = useSWR<Debate[]>(
    new Cookies().get('token')
      ? urljoin(api, `/classrooms/${classId}/debates`)
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
        {debates !== undefined && members !== undefined ? (
          <Container
            fluid="lg"
            className="mt-4 mb-5"
            style={{ fontFamily: 'NanumSquare' }}
          >
            <Row>
              {debates.map((one) => (
                <Col key={one.debateId}>
                  <Card border="light" className="shadow">
                    <Card.Header>
                      {one.subject} |{' '}
                      <small>
                        {members.find((m) => m.userId === one.created_by)?.name}
                      </small>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex align-items-center pb-2">
                        <Card.Text className="h3 font-weight-bold">
                          {one.name}{' '}
                        </Card.Text>
                        {one.status === 'open' ? (
                          <>
                            <CheckCircleIcon
                              className="ml-2 mr-1"
                              htmlColor="green"
                            />
                            진행중
                          </>
                        ) : (
                          <>
                            <RemoveCircleIcon
                              className="ml-2 mr-1"
                              htmlColor="red"
                            />
                            닫힘
                          </>
                        )}
                      </div>
                      <Card.Text>
                        우리 일상생활에서 사회 문제에 대해 토론합니다.
                      </Card.Text>
                    </Card.Body>
                    <Button
                      variant="light"
                      onClick={() =>
                        Router.push(`/class/${classId}/debates/asdf`)
                      }
                    >
                      토론 참여하기
                    </Button>
                  </Card>
                </Col>
              ))}
              <Col>
                <Card border="light" className="shadow">
                  <Card.Header>
                    국어 <small>XXX선생님</small>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex align-items-center pb-2">
                      <Card.Text className="h3 font-weight-bold">
                        국어 토론{' '}
                      </Card.Text>
                      <RemoveCircleIcon className="ml-2 mr-1" htmlColor="red" />
                      닫힘
                    </div>
                    <Card.Text>국어 토론</Card.Text>
                  </Card.Body>
                  <Button variant="light">토론 다시보기</Button>
                </Card>
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

export default Debates;