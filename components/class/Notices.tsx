import React from "react"
import { Row, Table, Pagination,Col, Container } from "react-bootstrap"

const Notices: React.FC<{ classId: string }> = ({ classId }) => {
  return (
    <Container fluid="lg" className="mt-4 mb-5" style={{ fontFamily: 'NanumSquare' }} >
      <Row> 
        <Table hover bordered striped> 
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
              <td>Test 3  </td>
              <td>홍길동</td>
            </tr>
          </tbody>
        </Table>
        
        <Col xs={5}>
        </Col>
        <Col xs={5}>

          <Pagination className="align-items-center">
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Next/>
            <Pagination.Last />

          </Pagination>
        </Col>
      </Row>
    </Container>
  )
}

export default Notices