import { GetServerSideProps, NextPage } from "next"

interface ClassHomeProps {
  classId: string
}

export const getServerSideProps: GetServerSideProps<ClassHomeProps> = async context => {
  const { class_id } = context.query
  return {
    props: {
      classId: class_id as string
    }
  }
}

const ClassHome: NextPage<ClassHomeProps> = ({ classId }) => {
  return (
    null
  )
}

export default ClassHome