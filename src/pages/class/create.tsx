import React, { useEffect } from 'react';
import Layout from 'components/Layout';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import Cookies from 'universal-cookie';

const ClassroomsCreate = () => {
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
            새로 만들기
          </h1>
        </Container>
      </div>
      <Col xs={12}  className="d-flex align-items-center h-100">
       <Container fluid="sm" style={{ maxWidth: 500, fontFamily: 'NanumSquare', fontSize : 20, height: 500, paddingTop: 30}}>

          <Form.Group controlId="titleInput">

            <Form.Label>클래스 이름 </Form.Label>
            <Form.Control placeholder="" />

            <Form.Label>클래스 부가설명</Form.Label>
            <Form.Control placeholder="" />
             
          </Form.Group>


                <Button
                  variant="success"
                  type="submit"
                  className="w-100 mb-1"
                >
                 클래스 생성
                </Button>
       


      </Container>
      </Col>
    </Layout>
  );
};

export default ClassroomsCreate;
