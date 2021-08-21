import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import { Card, Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';
import Link from 'next/link';
import axios from 'axios';
import api from 'datas/api';
import useSWR from 'swr';
import { Debate, Notice } from 'types/classrooms';
import Cookies from 'universal-cookie';
import urljoin from 'url-join';
import { User } from 'types/users';
import Router from 'next/router';
import dayjs from 'dayjs';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
dayjs.locale('ko');
dayjs.extend(dayjsRelativeTime);

interface ClassHomeProps {
  classId: string;
}

export const getServerSideProps: GetServerSideProps<ClassHomeProps> = async (
  context
) => {
  const { class_id } = context.query;
  return {
    props: {
      classId: class_id as string,
    },
  };
};

const ClassHome: NextPage<ClassHomeProps> = ({ classId }) => {
  const [time, setTime] = useState(new Date());

  const { data: notices } = useSWR<Notice[]>(
    new Cookies().get('token')
      ? urljoin(api, `/classrooms/${classId}/notices`)
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

  useEffect(() => {
    setInterval(() => setTime(new Date()));
  }, []);

  return (
    <Layout>
      <ClassLayout classId={classId}>
        {notices !== undefined &&
        debates !== undefined &&
        members !== undefined ? (
          <Container
            fluid="lg"
            className="mt-4 mb-5"
            style={{ fontFamily: 'NanumSquare' }}
          >
            <Row>
              <Col xs={12} md={4} className="mb-4">
                <Card border="light" className="shadow">
                  <Card.Header>시간표</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      1교시 <small>{time.toLocaleString()}</small>
                    </Card.Title>
                    <Card.Text className="h1 font-weight-bold">국어</Card.Text>
                    <Card.Text>OOO 선생님</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      다음 교시: 수학 (OOO 선생님)
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} md={8} className="mb-4">
                <Card border="light" className="shadow">
                  <Card.Header>현재 과제</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      action
                      className="d-flex justify-content-between align-items-center px-3 py-2"
                    >
                      <div>
                        독후감 작성하기
                        <small className="ml-2">국어 OOO</small>
                      </div>
                      <small>1일 2시간 남음</small>
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      className="d-flex justify-content-between align-items-center px-3 py-2"
                    >
                      <div>
                        과학 보고서 제출
                        <small className="ml-2">통합과학 XXX</small>
                      </div>
                      <small>기한 없음</small>
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      className="d-flex justify-content-between align-items-center px-3 py-2"
                    >
                      <div>
                        수학 발표 자료 제출
                        <small className="ml-2">수학 ???</small>
                      </div>
                      <small className="text-danger font-weight-bold">
                        20분 남음!
                      </small>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center px-3 py-3"></ListGroup.Item>
                  </ListGroup>
                  <Card.Footer className="text-right">
                    <Link href={`/class/${classId}/assignments`} shallow>
                      더보기
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} md={6} className="mb-4">
                <Card border="light" className="shadow">
                  <Card.Header>최근 공지</Card.Header>
                  <ListGroup variant="flush">
                    {notices
                      .sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )
                      .map((one) => (
                        <ListGroup.Item
                          key={one.noticeId}
                          action
                          className="d-flex justify-content-between align-items-center px-3 py-2"
                          onClick={() =>
                            Router.push(
                              `/class/${classId}/notices/${one.noticeId}`,
                              undefined,
                              { shallow: true }
                            )
                          }
                        >
                          <div>
                            {one.title}
                            <small className="ml-2">
                              {
                                members.find((m) => m.userId === one.writerId)
                                  ?.name
                              }
                            </small>
                          </div>
                          <small>{dayjs(one.created_at).fromNow()}</small>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                  <Card.Footer className="text-right">
                    <Link href={`/class/${classId}/notices`} shallow>
                      더보기
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} md={6} className="mb-4">
                <Card border="light" className="shadow">
                  <Card.Header>최근 열린 토론</Card.Header>
                  <ListGroup variant="flush">
                    {debates
                      .filter((o) => o.status === 'open')
                      .sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )
                      .map((one) => (
                        <ListGroup.Item
                          key={one.debateId}
                          action
                          className="d-flex justify-content-between align-items-center px-3 py-2"
                          onClick={() =>
                            Router.push(
                              `/class/${classId}/debates/${one.debateId}`,
                              undefined,
                              { shallow: true }
                            )
                          }
                        >
                          <div>
                            {one.name}
                            <small className="ml-2">
                              {
                                members.find((m) => m.userId === one.created_by)
                                  ?.name
                              }
                            </small>
                          </div>
                          <small>{dayjs(one.created_at).fromNow()}</small>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                  <Card.Footer className="text-right">
                    <Link href={`/class/${classId}/debates`} shallow>
                      더보기
                    </Link>
                  </Card.Footer>
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

export default ClassHome;
