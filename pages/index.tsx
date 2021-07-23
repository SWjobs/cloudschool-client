import Layout from 'components/Layout'
import { Button, Container } from 'react-bootstrap'
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons'
import Router from 'next/router'

const IndexPage = () => (
  <Layout>
    <div className="bg-primary" style={{ height: 500 }}>
      <Container fluid="sm" className="h-100">
        <div className="d-flex align-items-center h-100 justify-content-between">
          <div>
            <h1 className="text-white pb-4" style={{ fontSize: 60 }}>CloudSchool</h1>
            <Button variant="light" className="mt-5 d-flex align-items-center" onClick={() => Router.push('/class', undefined, { shallow: true })}>
              반으로 이동하기
              <ArrowForwardIcon className="ml-2" />
            </Button>
          </div>
          <img className="d-none d-lg-block" src="/assets/undraw_book_lover_mkck.svg" style={{ width: 400 }} />
        </div>
      </Container>
    </div>

    <div className="bg-white" style={{ height: 500 }}>
      <Container fluid="sm" className="d-flex align-items-center h-100">
        <h4 className="sm" style={{ fontSize: 50 }}>Everyday, Anywhere, for Everyone.</h4>
      </Container>
    </div>
  </Layout>
)

export default IndexPage
