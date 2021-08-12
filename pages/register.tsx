import React, { useRef, useState } from "react";
import Layout from "components/Layout";
import { NextPage } from "next";
import { Container, Col, Form, Row, Button } from "react-bootstrap";
import axios from "axios";
import api from "datas/api";
import Router from 'next/router'
import Image from 'next/image'

const Register: NextPage = () => {
  const [processing, setProcessing] = useState(false)
  const [userId, setUserId] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [orgName, setOrgName] = useState<string | null>(null)

  const [userIdValidate, setUserIdValidate] = useState<boolean | undefined>()
  const [nameValidate, setNameValidate] = useState<boolean | undefined>()
  const [passwordValidate, setPasswordValidate] = useState<boolean | undefined>()

  const [checkedDuplicate, setCheckedDuplicate] = useState<boolean | undefined>()

  return <Layout>
    <Container fluid="sm" className="my-5" style={{ maxWidth: 900, minHeight: '70vh' }}>
      <h3>CloudSchool 회원 가입</h3>
      <div className="text-center" style={{ margin: '60px 0' }}>
        <Image src="/assets/undraw_welcome_cats_thqn.svg" width={320} height={165} />
      </div>
      <Form noValidate>
        <Row>
          <Form.Label column xs={12} sm={3} md={2}>아이디*:</Form.Label>
          <Col>
            <Form.Group controlId="userId">
              <Form.Control
                type="text"
                placeholder="아이디"
                isValid={!userIdValidate && checkedDuplicate === false}
                isInvalid={userIdValidate}
                value={userId}
                onChange={e => {
                  setUserId(e.target.value)
                  setUserIdValidate(!!checkedDuplicate || !e.target.value)
                  setCheckedDuplicate(undefined)
                }}
              />
              <Form.Control.Feedback type="invalid">
                {
                  !userId
                    ? "아이디를 입력하세요!"
                    : "이미 사용중인 아이디입니다. 다른 아이디를 입력하세요!"
                }
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
                사용할 수 있는 아이디입니다!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs="auto" className="pl-0">
            <Button variant="secondary" disabled={checkedDuplicate === false || !userId} onClick={async () => {
              console.log({
                userId,
                name,
                password,
                orgName
              })

              let v = await axios.get(`${api}/auth/check-duplicate?user_id=${userId}`).then(r => r.data.isDuplicate) as boolean
              setCheckedDuplicate(v)
              setUserIdValidate(v)

              
            }}>
              중복 확인
            </Button>
          </Col>
        </Row>
        <Row>
          <Form.Label column xs={12} sm={3} md={2}>이름*:</Form.Label>
          <Col>
            <Form.Group controlId="userId">
              <Form.Control
                type="text"
                placeholder="사용자 이름"
                isInvalid={nameValidate}
                value={name}
                onChange={e => {
                  setName(e.target.value)
                  setNameValidate(!e.target.value)
                }}
              />
              <Form.Control.Feedback type="invalid">
                이름을 입력하세요!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Label column xs={12} sm={3} md={2}>패스워드*:</Form.Label>
          <Col>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="패스워드"
                isInvalid={passwordValidate}
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  setPasswordValidate(e.target.value.length < 8)
                }}
              />
              <Form.Control.Feedback type="invalid">
                비밀번호는 적어도 8자 이상이여야 합니다!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Label column xs={12} sm={3} md={2}>학교 이름:</Form.Label>
          <Col>
            <Form.Group controlId="orgName">
              <Form.Control
                type="text"
                placeholder="OO고등학교"
                value={orgName ?? undefined}
                onChange={e => setOrgName(e.target.value || null)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="w-100 text-right">
            <Button variant="success" style={{ width: 160 }} disabled={processing || !userId || userIdValidate || !name || nameValidate || !password || passwordValidate || checkedDuplicate !== false} onClick={() => {
              setProcessing(true)
              axios.post(`${api}/auth/register`, {
                userId,
                name,
                password,
                orgName
              })
                .then(() => Router.push('/login', undefined, { shallow: true }))
            }}>
              {processing ? "회원가입 중..." : "회원가입"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  </Layout>
}

export default Register