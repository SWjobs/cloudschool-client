import React, { useState } from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Row,
  Spinner,
} from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';
import TextareaAutosize from 'react-textarea-autosize';
import { CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import axios from 'axios';
import api from 'datas/api';
import useSWR from 'swr';
import Cookies from 'universal-cookie';
import urljoin from 'url-join';
import { Debate, DebateComment } from 'types/classrooms';
import { User } from 'types/users';
import { scroller } from 'react-scroll';
import dayjs from 'dayjs';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import DebateCreateNew from 'components/debates/DebateCreateNew';
dayjs.locale('ko');
dayjs.extend(dayjsRelativeTime);

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

const DebatePage: React.FC<DebateProps> = ({ classId, debateId }) => {
  const [isSending, setIsSending] = useState(false);
  const [content, setContent] = useState('');

  const { data: me } = useSWR<User>(
    new Cookies().get('token') ? urljoin(api, `/users/me`) : null,
    (url) =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
          },
        })
        .then((r) => r.data)
  );

  const { data: debate } = useSWR<Debate>(
    new Cookies().get('token')
      ? urljoin(api, `/classrooms/${classId}/debates/${debateId}`)
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

  const { data: comments, mutate: mutateComments } = useSWR<DebateComment[]>(
    new Cookies().get('token')
      ? urljoin(api, `/classrooms/${classId}/debates/${debateId}/comments`)
      : null,
    (url) =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
          },
        })
        .then((r) => r.data),
    {
      refreshInterval: 2000,
    }
  );

  return (
    <Layout>
      <ClassLayout classId={classId}>
        {debate !== undefined &&
        members !== undefined &&
        comments !== undefined &&
        me !== undefined ? (
          <Container fluid="lg" className="mt-4 mb-5">
            <Row className="mb-5" style={{ fontFamily: 'NanumSquare' }}>
              <Col>
                <Card bg="light" className="shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <Card.Text className="h3 font-weight-bold">
                        {debate.name}{' '}
                      </Card.Text>
                      <CheckCircleIcon
                        className="ml-2 mr-1"
                        htmlColor="green"
                      />
                      {debate.status === 'open' ? '진행중' : '종료됨'}
                    </div>
                    <Card.Text className="pb-2">
                      {debate.subject} |{' '}
                      {
                        members.find((m) => m.userId === debate.created_by)
                          ?.name
                      }
                    </Card.Text>
                    <Card.Text>{debate.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {comments.map((one) => (
              <Row
                key={one.commentId}
                className={`mt-5 ${
                  one.userId === me.userId ? 'flex-row-reverse' : ''
                }`}
                style={{ fontFamily: 'NanumBarunGothic' }}
              >
                <Col
                  xs={11}
                  className={`d-flex w-100 ${
                    one.userId === me.userId ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className="rounded-circle mx-2 mt-2"
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: '#0000ff',
                    }}
                  />
                  <Card
                    className="w-100 shadow-sm"
                    style={{
                      backgroundColor:
                        one.userId === me.userId ? '#e6f3ff' : 'inherit',
                    }}
                  >
                    <Card.Header
                      className={`d-flex align-items-center ${
                        one.userId === me.userId ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Card.Text className="h6 font-weight-bold mb-0">
                        {members.find((m) => m.userId === one.userId)?.name}
                      </Card.Text>
                      <small
                        className={`m${
                          one.userId === me.userId ? 'r' : 'l'
                        }-auto text-muted`}
                      >
                        {dayjs(one.created_at).fromNow()}
                      </small>
                    </Card.Header>
                    <Card.Body className="pt-3">
                      <Card.Text>{one.content}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}

            <hr className="my-4" style={{ border: 'solid 1px #eeeeee' }} />

            <Row>
              <Col>
                <Card>
                  <Card.Body className="p-2">
                    <FormControl
                      id="comment-content"
                      as={TextareaAutosize}
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
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
                    <Button
                      variant="success"
                      disabled={isSending || !content.length}
                      onClick={() => {
                        setIsSending(true);
                        axios
                          .post(
                            `${api}/classrooms/${classId}/debates/${debateId}`,
                            {
                              content: content,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${new Cookies().get(
                                  'token'
                                )}`,
                              },
                            }
                          )
                          .then((r) => {
                            setContent('');
                            mutateComments(comments.concat(r.data)).then(() => {
                              scroller.scrollTo('comment-content', {
                                smooth: true,
                              });
                            });
                          })
                          .finally(() => setIsSending(false));
                      }}
                    >
                      {isSending ? '전송 중...' : '의견 남기기'}
                    </Button>
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

const Page: NextPage<DebateProps> = ({ classId, debateId }) => {
  return debateId === 'create' ? (
    <DebateCreateNew classId={classId} />
  ) : (
    <DebatePage classId={classId} debateId={debateId} />
  );
};

export default Page;
