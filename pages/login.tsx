import React, { useRef, useState } from "react";
import Layout from "components/Layout";
import { NextPage } from "next";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import Router from 'next/router'
import axios, { AxiosError } from "axios";
import api from 'datas/api'

const Login: NextPage = () => {
  const idRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [passwordIncorrect, setPasswordIncorrect] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!!idRef.current?.value && !!passwordRef.current?.value) {
      setLoggingIn(true)
      try {
        const { data } = await axios.post(`${api}/auth/login`, {
          uid: idRef.current.value,
          password: passwordRef.current.value
        })
        localStorage.setItem('token', data.token)
        Router.push('/', undefined, { shallow: true })
      }
      catch (_e) {
        const e: AxiosError = _e
        if (e.response?.status === 400) setPasswordIncorrect(true)
        setLoggingIn(false)
      }
    }
  }

  return <Layout>
    <div className="d-flex align-items-center" style={{ height: '75vh' }}>
      <Container fluid="sm" style={{ maxWidth: 400 }}>
        <Form noValidate onSubmit={submitLogin}>
          <h3 className="pb-2">로그인</h3>
          <Form.Group>
            <Form.Control placeholder="아이디" ref={idRef} />
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" placeholder="패스워드" ref={passwordRef} />
            {
              passwordIncorrect &&
              <Form.Text className="text-danger pt-2">아이디 또는 비밀번호가 올바르지 않습니다!</Form.Text>
            }
          </Form.Group>
          <Row>
            <Col xs={12} sm={8} className="d-flex pr-3 pr-sm-0">
              <Button variant="success" type="submit" className="w-100 mb-1" disabled={loggingIn}>{loggingIn ? "로그인 중..." : "로그인"}</Button>
            </Col>
            <Col xs={12} sm={4} className="d-flex">
              <Button variant="secondary" className="w-100 mb-1" onClick={() => Router.push('/register', undefined, { shallow: true })}>가입</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  </Layout>
}

export default Login