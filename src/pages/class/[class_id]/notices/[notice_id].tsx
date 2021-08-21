import React from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';
import { Notice } from 'types/classrooms';
import axios from 'axios';
import api from 'datas/api';
import useSWR from 'swr';
import Cookies from 'universal-cookie';
import urljoin from 'url-join';
import { User } from 'types/users';
import ReactMarkdown from 'react-markdown';
import { Menu as MenuIcon } from '@material-ui/icons';
import Link from 'next/link';

interface NoticesProps {
  classId: string;
  noticeId: string;
}

export const getServerSideProps: GetServerSideProps<NoticesProps> = async (
  context
) => {
  const { class_id, notice_id } = context.query;
  return {
    props: {
      classId: class_id as string,
      noticeId: notice_id as string,
    },
  };
};

const Notices: NextPage<NoticesProps> = ({ classId, noticeId }) => {
  const { data: notice } = useSWR<Notice>(
    new Cookies().get('token')
      ? urljoin(api, `/classrooms/${classId}/notices/${noticeId}`)
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
        {notice && members ? (
          <Container fluid="lg" className="mt-4 mb-5">
            <Card style={{ minHeight: '60vh' }}>
              <Card.Body>
                <div className="mb-4">
                  <h2 style={{ fontFamily: 'NanumSquare' }}>{notice.title}</h2>
                  <div>
                    작성자:{' '}
                    {members.find((m) => m.userId === notice.writerId)?.name ??
                      '(알 수 없음)'}
                  </div>
                </div>
                <ReactMarkdown>{notice.content}</ReactMarkdown>
              </Card.Body>
            </Card>
            <Row className="text-right mt-3">
              <Col>
                <Link href={`/class/${classId}/notices`} passHref>
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

export default Notices;
