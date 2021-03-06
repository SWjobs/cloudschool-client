import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import styles from 'styles/components/Footer.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <Container fluid="sm" className="text-center text-md-left">
        <Row>
          <Col md={5} className="mt-md-0 mt-3">
            <h4 className="text-uppercase no-drag">CloudSchool</h4>
            <p
              className="mb-2"
              style={{
                fontSize: '13pt',
              }}
            >
              Everyday, Everywhere, for Everyone.
            </p>
          </Col>
          <Col md={2}>
            <h5>사이트</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/">홈</Link>
              </li>
              <li>
                <Link href="/class">내 학반</Link>
              </li>
            </ul>
          </Col>
        </Row>
        <div className={cx('FooterCopyright', 'text-center')}>
          Copyright © 2021 SWjobs Project All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
