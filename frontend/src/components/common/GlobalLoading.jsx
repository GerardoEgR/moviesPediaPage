import React, { useEffect, useState } from 'react'
import { ProgressBar, Container, Row } from 'react-bootstrap'
import Logo from './Logo'
// import './GlobalLoading.css'
import { useGlobalLoading } from '../../store/globalLoadingStore'

const GlobalLoading = () => {
  const loading = useGlobalLoading((state) => state.loading)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      setIsLoading(true)
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [loading])

  return (
    <>
    {loading &&
      <Container fluid style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: 'none',
        transition: 'all 0.3s ease',
        position: 'fixed',
        width: '100%',
        height: '100vh',
        zIndex: 999,
        paddingTop: '5.3rem'
      }}>
        <ProgressBar className="loader" style={{ backgroundColor: '#2b3035', width: '100%' }} />
        <Row style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <Logo />
        </Row>
      </Container>
      }
    </>
  )
}

export default GlobalLoading