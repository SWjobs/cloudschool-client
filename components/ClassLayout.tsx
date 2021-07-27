import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Container, Nav } from "react-bootstrap"

const ClassLayout: React.FC<{ classId: string }> = ({ classId, children }) => {
  const [location, setLocation] = useState<Location | null>(null)

  useEffect(() => {
    setLocation(window.location)
  }, [])
  
  return <>
    <div className="bg-primary" style={{ height: 110 }}>
      <Container fluid="sm" className="h-100 d-flex align-items-center">
        <div className="text-white">
          <h1 style={{ fontSize: 32 }}>2021 1학년 1반</h1>
          <div>2021학년도 1학년 1반 클래스</div>
        </div>
      </Container>
    </div>

    <Nav variant="pills" className="justify-content-center p-3">
      <Nav.Item>
        <Link href={`/class/${classId}`} shallow>
          <Nav.Link href={`/class/${classId}`} active={location?.pathname === `/class/${classId}`}>메인</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href={`/class/${classId}/notices`} shallow>
          <Nav.Link href={`/class/${classId}/notices`} active={location?.pathname.startsWith(`/class/${classId}/notices`)}>공지</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href={`/class/${classId}/assignments`} shallow>
          <Nav.Link href={`/class/${classId}/assignments`} active={location?.pathname.startsWith(`/class/${classId}/assignments`)}>과제</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href={`/class/${classId}/boards`} shallow>
          <Nav.Link href={`/class/${classId}/boards`} active={location?.pathname.startsWith(`/class/${classId}/boards`)}>게시판</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href={`/class/${classId}/debates`} shallow>
          <Nav.Link href={`/class/${classId}/debates`} active={location?.pathname.startsWith(`/class/${classId}/debates`)}>토론</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href={`/class/${classId}/calendar`} shallow>
          <Nav.Link href={`/class/${classId}/calendar`} active={location?.pathname.startsWith(`/class/${classId}/calendar`)}>일정</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>

    {children}
  </>
}

export default ClassLayout