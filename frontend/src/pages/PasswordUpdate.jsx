import React from 'react'
import { Button, Col, Container, Form, Row, Spinner, Stack } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useUserStore } from '../store/userStore'
import { passwordUpdate } from '../api/modules/user.api'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { routesGen } from '../routes/routes'
import { useAuthModal } from '../store/authModalStore'

const PasswordUpdate = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const setAuthModalOpen = useAuthModal((state) => state.setAuthModalOpen)
  const navigate = useNavigate()

  const updatePassword = useMutation({
    mutationFn: passwordUpdate,
    onSuccess: (data) => {
      toast.success(data?.response?.message)
      reset()
      setUser(null)
      navigate(routesGen.home)
      setAuthModalOpen(true)
    },
    onError: (error) => {
      console.error('Error to update password:', error)
      toast.error('Error to update password')
    }
  })

  const onSubmit = handleSubmit(async (data) => {

    const bodyUpdate = {
      id: user.id,
      username: user.username,
      password: data.confirmPassword,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
    }

    try {
      await updatePassword.mutateAsync(bodyUpdate)
    } catch (error) {
      console.error('Error to update password:', error)
    }

  })


  return (
    <>
      <Container className='mt-lg-5' style={{ paddingTop: '8rem' }}>
        <hr style={{ borderBottom: '1px solid #696868', width: '80%', margin: 'auto' }} />
        <Row className="mt-3 mb-lg-5 justify-content-center">
          <h1 className="display-3 text-center"
            style={{ textShadow: '1px 1px 1px #000' }}
          >Password Update</h1>
          <Col lg={4} md={12} sm={12} xs={12}>
            <Form onSubmit={onSubmit} style={{ paddingTop: '2rem' }}>
              <Form.Group className="mb-4" controlId="validationCustom01">
                <Form.Control
                  className='holder'
                  type="password"
                  placeholder="New Password"
                  {...register('newPassword', {
                    required: {
                      value: true,
                      message: 'This field is required.'
                    },
                    minLength: {
                      value: 8,
                      message: 'Your password must be 8 characters long.'
                    }
                  })}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '1px solid #696868'
                  }}
                />
                {errors.newPassword && <Form.Text className="text-danger">
                  {errors.newPassword.message}
                </Form.Text>}
              </Form.Group>

              <Form.Group className="mb-4" controlId="validationCustom02">
                <Form.Control
                  className='holder'
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: {
                      value: true,
                      message: 'This field is required.'
                    },
                    minLength: {
                      value: 8,
                      message: 'Your password must be 8 characters long.'
                    },
                    validate: value => value === watch('newPassword') || 'The passwords do not match.'
                  })}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '1px solid #696868'
                  }}
                />
                {errors.confirmPassword && <Form.Text className="text-danger">
                  {errors.confirmPassword.message}
                </Form.Text>}
              </Form.Group>

              <Stack gap={2} className="mx-auto mt-3">
                <Button
                  type='submit'
                  variant="outline-info"
                >
                  {updatePassword.isPending ?
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    /> : <span>Update Password</span>}
                </Button>
              </Stack>
            </Form>
          </Col>
        </Row>
        <hr style={{
          borderBottom: '1px solid #696868',
          width: '80%',
          margin: 'auto',
          marginTop: '5rem'
        }} />
      </Container>
    </>
  )
}

export default PasswordUpdate