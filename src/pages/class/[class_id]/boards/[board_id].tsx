import React from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  FormControl,
} from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';
import TextareaAutosize from 'react-textarea-autosize';

interface BoardProps {
  classId: string;
  boardId: string;
}

export const getServerSideProps: GetServerSideProps<BoardProps> = async (
  context
) => {
  const { class_id, board_id } = context.query;
  return {
    props: {
      classId: class_id as string,
      boardId: board_id as string,
    },
  };
};

const Board: NextPage<BoardProps> = ({ classId, boardId }) => {
  return (
    <Layout>
        <ClassLayout classId={classId}></ClassLayout>
        <Container
fluid="lg"
className="mt-4 mb-5"
style={{ fontFamily: 'NanumSquare' }}
      > 
    <Form>
        <Row>
            <Col xs={12}>
                
      <Form.Group controlId="titleInput" as={Col} >
        <Form.Label>제목</Form.Label>
        <Form.Control required type="testarea" placeholder="" />
      </Form.Group>

      <Form.Group controlId="contentText" as={Col}>
        <Form.Label>내용</Form.Label>
        <FormControl
                    as={TextareaAutosize}
                    type="text"
                    minRows={10}
                    maxRows={17}
                    style={{
                      fontFamily: 'NanumBarunGothic',
                    }}
                  />
      </Form.Group>

      <Button variant="secondary" type="submit" class="btn float-right" as={Col} >
            저장
         </Button>
         </Col>

        </Row>
     
            
    
    </Form>
      </Container>
    </Layout>
    
  );
};

export default Board;
