import React, { useEffect, useState } from 'react'
import { useAuthModal } from '../../store/authModalStore'
import { Modal } from 'react-bootstrap'
import Logo from './Logo'
import SigninForm from './SignInForm'
import SignupForm from './SignUpForm'

const actionState = {
  signin: 'signin',
  signup: 'signup'
}
const AuthModal = () => {
  const authModalOpen = useAuthModal((state) => state.authModalOpen)
  const setAuthModalOpen = useAuthModal((state) => state.setAuthModalOpen)
  const [action, setAction] = useState(actionState.signin)
  
  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin)
  }, [authModalOpen])

  const handleClose = () => setAuthModalOpen(false)
  const switchAuthState = (state) => setAction(state)

  return (
    <>
      
        <Modal show={authModalOpen} onHide={handleClose} keyboard={false} backdrop="static" centered>
          <Modal.Header closeButton className="bg-dark" style={{ border: '1px solid #696868' }}>
            <Modal.Title><Logo /></Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark lead" style={{ borderLeft: '1px solid #696868', borderRight: '1px solid #696868' }}>
          {action === actionState.signin && <SigninForm switchAuthState={() => switchAuthState(actionState.signup)} />}
          {action === actionState.signup && <SignupForm switchAuthState={() => switchAuthState(actionState.signin)} />}
          </Modal.Body>
          <Modal.Footer className="bg-dark" style={{ border: '1px solid #696868', borderTop: 'none' }}></Modal.Footer>
        </Modal>
      
      
    </>
  )
}

export default AuthModal