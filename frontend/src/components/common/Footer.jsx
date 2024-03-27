import { useState } from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import menuConfigs from '../../configs/menu.configs'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [isActiveIndex, setIsActiveIndex] = useState(0)
  return (
    <>
      <footer className="footer">
        <Container fluid >
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={12} className="text-center container" style={{ borderBottom: '1px solid #696868', width: '90%' }}>
              <Logo />
              <Nav className="d-flex justify-content-center lead" style={{ color: '#ffffff' }}>
                {menuConfigs.main.map((item, index) => (
                  <Nav.Link as={Link} to={item.path} key={index}
                    onClick={() => setIsActiveIndex(index)}
                    style={{
                      color: isActiveIndex === index ? '#0dcaf0' : '#03a4c0',
                      textShadow: '1px 1px 1px #000'
                    }}
                  >{item.display}</Nav.Link>
                ))}
              </Nav>
            </Col>
            <Col md={12} className="text-center" style={{ paddingTop: '4rem', color: '#979696', textShadow: '1px 1px 1px #000' }}>
              <p>Copyright © 2024. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer