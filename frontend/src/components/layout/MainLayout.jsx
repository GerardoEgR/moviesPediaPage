import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import GlobalLoading from '../common/GlobalLoading'
import Footer from '../common/Footer'
import Topbar from '../common/Topbar'
import AuthModal from '../common/AuthModal'

const MainLayout = () => {
  return (
    <>
      {/* global loading */}
      <GlobalLoading />

      {/* login modal */}
      <AuthModal />

      <Container fluid className="d-flex flex-column min-vh-100">
        {/* header */}
        <Topbar />

        {/* main */}
        <Container fluid className="flex-grow-1 overflow-hidden">
          <Outlet />
        </Container>

      </Container>

      {/* footer */}
      <Footer />

    </>
  )
}

export default MainLayout