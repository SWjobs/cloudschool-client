import React, { useState } from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from 'styles/components/Navibar.module.scss';

import MenuIcon from '@material-ui/icons/Menu';

import Router from 'next/router';
import axios from 'axios';
import api from 'datas/api';
import useSWR from 'swr';
import Cookies from 'universal-cookie';
import urljoin from 'url-join';
import { User } from 'types/users';

const cx = classNames.bind(styles);

const Navibar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const { data, mutate } = useSWR<User | null>(
    new Cookies().get('token') ? urljoin(api, '/users/me') : null,
    (url) =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${new Cookies().get('token')}`,
          },
        })
        .then((r) => r.data)
  );

  return (
    <div className={cx('NavbarMargin')}>
      <Navbar
        bg="light"
        expand="md"
        onToggle={(e) => setExpanded(e)}
        expanded={expanded}
        fixed="top"
        className="no-drag shadow px-2"
      >
        <Container fluid className={styles.NavContainer}>
          <Link href="/" passHref>
            <Navbar.Brand className="d-flex align-items-center pr-1">
              <img
                alt=""
                src="/assets/icon.png"
                style={{
                  height: 30,
                }}
              />
              <span className="pl-3">CloudSchool</span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle
            aria-controls="navbar-nav"
            className={styles.NavbarToggle}
          >
            <MenuIcon style={{ fontSize: '20pt' }} />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto" onSelect={() => setExpanded(false)}>
              <Link href="/class" shallow passHref>
                <Nav.Link className={styles.Navlink}>내 학반</Nav.Link>
              </Link>
            </Nav>
            <Nav>
              {data ? (
                <NavDropdown
                  id="nav-dropdown"
                  style={{ paddingLeft: 80 }}
                  title={data.name}
                >
                  <NavDropdown.Item
                    onClick={() => {
                      new Cookies().remove('token');
                      if (Router.pathname == '/') {
                        mutate(null, false);
                      } else {
                        Router.push('/');
                      }
                    }}
                  >
                    로그아웃
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  onClick={() => {
                    const lct = window.location;
                    localStorage.setItem(
                      'loginFrom',
                      lct.pathname + lct.search
                    );
                    Router.push('/login');
                  }}
                >
                  로그인
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navibar;
