import Layout from 'components/Layout'
import { Container } from 'react-bootstrap'

const IndexPage = () => (
  <Layout>
    <div className="bg-primary" style={{ height: 500 }}>
      <Container fluid="sm" className="d-flex align-items-center h-100">
        <h1 className="text-white" style={{ fontSize: 70 }}>CloudSchool</h1>
      </Container>
    </div>

  <div className="bg-white" style={{ height: 500 }}>
      <Container fluid="sm" className="d-flex align-items-center h-100">
        <h4 className="sm" style={{ fontSize: 50 }}>Everyday, Anywhere, for Eㄴveryone.</h4>
      </Container>
    </div>
  </Layout>
)

export default IndexPage
