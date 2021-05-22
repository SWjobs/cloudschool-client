import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import Link from 'next/link'
import classNames from 'classnames/bind'
import styles from 'styles/components/Navibar.module.scss'

import MenuIcon from '@material-ui/icons/Menu';

import Router from 'next/router'

const cx = classNames.bind(styles)

interface NavibarState {
  expanded: boolean
}

export default class Navibar extends React.Component<{}, NavibarState> {
  state: NavibarState = {
    expanded: false,
  }

  mounted: boolean = false

  handleOnToggle = (expanded: boolean) => {
    this.setState({ expanded })
  }

  closeNavbar = () => {
    this.setState({ expanded: false })
  }

  handleLogin = () => {
    const lct = window.location
    localStorage.setItem('loginFrom', lct.pathname + lct.search)
    Router.push('/login')
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return (
      <div className={cx("NavbarMargin")}>
        <Navbar bg="light" expand="md" onToggle={this.handleOnToggle} expanded={this.state.expanded} fixed="top" className="no-drag shadow px-2">
          <Container fluid className={styles.NavContainer}>
            <Link href="/">
              <Navbar.Brand href="/" className="d-flex align-items-center pr-1">
                <img src="/assets/icon.png" style={{
                  height: 30
                }} />
                <span className="pl-3">CloudSchool</span>
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="navbar-nav" className={styles.NavbarToggle}>
              <MenuIcon style={{ fontSize: '20pt' }} />
            </Navbar.Toggle>
            <Navbar.Collapse id="navbar-nav">
              <Nav className="mr-auto" onSelect={this.closeNavbar}>
                <Link href="/class" shallow>
                  <Nav.Link href="/class" className={styles.Navlink}>
                    내 학반
                  </Nav.Link>
                </Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={this.handleLogin}>로그인</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}