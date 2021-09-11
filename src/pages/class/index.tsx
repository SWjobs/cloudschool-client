import React, { useEffect } from 'react';
import Layout from 'components/Layout';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Router from 'next/router';
import axios from 'axios';
import api from 'datas/api';
import useSWR from 'swr';
import { Classroom } from 'types/classrooms';
import urljoin from 'url-join';
import Cookies from 'universal-cookie';

const Classrooms = () => {
  const { data } = useSWR<Classroom[]>(
    new Cookies().get('token') ? urljoin(api, `/classrooms`) : null,
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
    if (!new Cookies().get('token')) {
      const lct = window.location;
      localStorage.setItem('loginFrom', lct.pathname + lct.search);
      window.location.assign('/login');
    }
  }, []);

  return (
    <Layout>
      <div className="bg-primary" style={{ height: 100 }}>
        <Container fluid="sm" className="d-flex align-items-center h-100">
          <h1 className="text-white" style={{ fontSize: 40 }}>
            내 학반
          </h1>
        </Container>
      </div>
      <div className="bg-white" style={{ height: 500, paddingTop: 30 }}>
        <Container fluid="sm">
          <Row className="pb-4 text-right">
            <Col>
              <Button variant="primary" className="shadow">
                클래스 참가하기
              </Button>
              <Button variant="outline-primary" className="ml-2 shadow"
              
              onClick={() =>
                Router.push(`/class/create`, undefined, {
                  shallow: true,
                })
              }
              >
                새 클래스 만들기
              </Button>
            </Col>
          </Row>
          <Row>
            {data?.map((one) => (
              <Col key={one.classId} xs={4}>
                <Card
                  className="cursor-pointer shadow-sm"
                  onClick={() =>
                    Router.push(`/class/${one.classId}`, undefined, {
                      shallow: true,
                    })
                  }
                >
                  <Card.Body>
                    <Card.Title>{one.name}</Card.Title>
                    <Card.Text>{one.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Classrooms;
