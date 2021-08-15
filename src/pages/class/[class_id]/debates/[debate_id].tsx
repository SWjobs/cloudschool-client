import React from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Row,
} from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';
import TextareaAutosize from 'react-textarea-autosize';
import { CheckCircle as CheckCircleIcon } from '@material-ui/icons';

interface DebateProps {
  classId: string;
  debateId: string;
}

export const getServerSideProps: GetServerSideProps<DebateProps> = async (
  context
) => {
  const { class_id, debate_id } = context.query;
  return {
    props: {
      classId: class_id as string,
      debateId: debate_id as string,
    },
  };
};

const Debate: NextPage<DebateProps> = ({ classId, debateId }) => {
  return (
    <Layout>
      <ClassLayout classId={classId}>
        <Container fluid="lg" className="mt-4 mb-5">
          <Row className="mb-5" style={{ fontFamily: 'NanumSquare' }}>
            <Col>
              <Card bg="light" className="shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <Card.Text className="h3 font-weight-bold">
                      사회 문제 토론{' '}
                    </Card.Text>
                    <CheckCircleIcon className="ml-2 mr-1" htmlColor="green" />
                    진행중
                  </div>
                  <Card.Text className="pb-2">
                    사회 <small>OOO선생님</small>
                  </Card.Text>
                  <Card.Text>
                    우리 일상생활에서 사회 문제에 대해 토론합니다.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5" style={{ fontFamily: 'NanumBarunGothic' }}>
            <Col className="d-flex w-100">
              <div
                className="rounded-circle mr-2 mt-2"
                style={{ width: 36, height: 36, backgroundColor: '#0000ff' }}
              />
              <Card className="w-100 shadow-sm">
                <Card.Header className="d-flex align-items-center">
                  <Card.Text className="h6 font-weight-bold mb-0">
                    김OO
                  </Card.Text>
                  <small className="ml-auto text-muted">하루 전</small>
                </Card.Header>
                <Card.Body className="pt-3">
                  <Card.Text>
                    저는 오늘날 사회 문제 중 코로나19로 인한 피해가 가장 크다고
                    생각합니다.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-4" style={{ border: 'solid 1px #eeeeee' }} />

          <Row>
            <Col>
              <Card>
                <Card.Body className="p-2">
                  <FormControl
                    as={TextareaAutosize}
                    type="text"
                    placeholder="이곳에 의견을 입력합니다"
                    minRows={4}
                    maxRows={12}
                    style={{
                      fontFamily: 'NanumBarunGothic',
                      borderColor: '#efefef',
                    }}
                  />
                </Card.Body>
                <Card.Footer className="p-2 text-right">
                  <Button variant="success">의견 남기기</Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </ClassLayout>
    </Layout>
  );
};

export default Debate;
