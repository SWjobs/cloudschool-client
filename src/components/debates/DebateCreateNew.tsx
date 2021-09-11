import React, { useState } from 'react';
import Layout from 'components/Layout';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';
import axios from 'axios';
import api from 'datas/api';
import Cookies from 'universal-cookie';
import Router from 'next/router';

interface DebatesCreateProps {
  classId: string;
}

const DebatesCreate: React.FC<DebatesCreateProps> = ({ classId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  return (
    <Layout>
      <ClassLayout classId={classId}>
        <Container fluid="lg" className="mt-4 mb-5">
          <Form noValidate>
            <Row style={{ fontFamily: 'NanumSquare' }}>
              <Col>
                <h3>새 토론 생성하기</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Row className="my-3">
                    <Form.Label column xs="auto">
                      토론 이름
                    </Form.Label>
                    <Col>
                      <Form.Control
                        id="debate-name"
                        type="text"
                        placeholder="예) 사회 문제 탐구"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Form.Label column xs="auto">
                      토론 설명
                    </Form.Label>
                    <Col>
                      <Form.Control
                        id="debate-description"
                        type="text"
                        placeholder="예) 우리 주위에서 일어나는 사회 문제에 대해 토론합니다."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Form.Label column xs="auto">
                      토론 과목/주제
                    </Form.Label>
                    <Col>
                      <Form.Control
                        id="debate-description"
                        type="text"
                        placeholder="예) 사회, 탐구"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  variant="success"
                  disabled={isSaving}
                  onClick={() => {
                    setIsSaving(true);
                    axios
                      .post(
                        `${api}/classrooms/${classId}/debates`,
                        {
                          name,
                          description,
                          subject,
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
                        setIsSaving(false);
                        Router.push(
                          `/class/${classId}/debates/${r.data.debateId}`
                        );
                      });
                  }}
                >
                  {isSaving ? '생성 중...' : '생성하기'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </ClassLayout>
    </Layout>
  );
};

export default DebatesCreate;
