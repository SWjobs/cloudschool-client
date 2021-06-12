import Layout from 'components/Layout'
import { Container } from 'react-bootstrap'

const classroom = () => (
    <Layout>
    <div className="bg-primary" style={{ height: 100 }}>
      <Container fluid="sm" className="d-flex align-items-center h-100">
        <h1 className="text-white" style={{ fontSize: 40 }}>Classrooms</h1>
      </Container>
    </div>
    <div className="bg-white" style={{ height: 500 }}>
      
    </div>
  </Layout>
  )

export default classroom