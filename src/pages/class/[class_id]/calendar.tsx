import React from 'react';
import Layout from 'components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import { Container, Row } from 'react-bootstrap';
import ClassLayout from 'components/ClassLayout';

interface CalendarProps {
  classId: string;
}

export const getServerSideProps: GetServerSideProps<CalendarProps> = async (
  context
) => {
  const { class_id } = context.query;
  return {
    props: {
      classId: class_id as string,
    },
  };
};

const Calendar: NextPage<CalendarProps> = ({ classId }) => {
  return (
    <Layout>
      <ClassLayout classId={classId}>
        <Container
          fluid="lg"
          className="mt-4 mb-5"
          style={{ fontFamily: 'NanumSquare' }}
        >
          <Row></Row>
        </Container>
      </ClassLayout>
    </Layout>
  );
};

export default Calendar;
