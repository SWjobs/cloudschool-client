import React from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import {
  Col,
  Container,
  Pagination,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';
import { Notice } from 'types/classrooms';
import axios from 'axios';
import api from 'datas/api';
import useSWR from 'swr';
import Cookies from 'universal-cookie';
import urljoin from 'url-join';
import Link from 'next/link';
import { User } from 'types/users';

interface NoticesProps {
  classId: string;
}

export const getServerSideProps: GetServerSideProps<NoticesProps> = async (
  context
) => {
  const { class_id } = context.query;
  return {
    props: {
      classId: class_id as string,
    },
  };
};

const Notices: NextPage<NoticesProps> = ({ classId }) => {
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
        {notices && members ? (
          <Container
            fluid="lg"
            className="mt-4 mb-5"
            style={{ fontFamily: 'NanumSquare' }}
          >
            <Row>
              <Table bordered>
                <thead>
                  <tr>
                    <th>제목</th>
                    <th>작성자</th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map((one) => (
                    <Link
                      key={one.noticeId}
                      href={`/class/${classId}/notices/${one.noticeId}`}
                      passHref
                    >
                      <tr className="cursor-pointer">
                        <td>{one.title}</td>
                        <td>
                          {members.find((m) => m.userId === one.writerId)
                            ?.name ?? '(알 수 없음)'}
                        </td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </Table>

              <Col xs={5}></Col>
              <Col xs={5}>
                <Pagination className="align-items-center">
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item>{1}</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
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
