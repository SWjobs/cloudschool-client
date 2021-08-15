import React from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import {
  Button,
  Col,
  Container,
  Pagination,
  Row,
  Table,
} from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';

interface BoardsProps {
  classId: string;
}

export const getServerSideProps: GetServerSideProps<BoardsProps> = async (
  context
) => {
  const { class_id } = context.query;
  return {
    props: {
      classId: class_id as string,
    },
  };
};

const Boards: NextPage<BoardsProps> = ({ classId }) => {
  return (
    <Layout>
      <ClassLayout classId={classId}>
        <Container
          fluid="lg"
          className="mt-4 mb-5"
          style={{ fontFamily: 'NanumSquare' }}
        >
          <Row>
            <Table hover bordered>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Test 1</td>
                  <td>홍길동</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Test 2</td>
                  <td>홍길동</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Test 3 </td>
                  <td>홍길동</td>
                </tr>
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
            <Col xs={2}>
              <Button variant="primary" className="align-items-right">
                글쓰기
              </Button>
            </Col>
          </Row>
        </Container>
      </ClassLayout>
    </Layout>
  );
};

export default Boards;
