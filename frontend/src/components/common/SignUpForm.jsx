import { Button, Form, Spinner, Stack } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useUserStore } from '../../store/userStore'
import { useAuthModal } from '../../store/authModalStore'
import { toast } from 'react-toastify'
import { getInfo, signUp } from '../../api/modules/user.api'
import { useMutation } from '@tanstack/react-query'

const SignupForm = ({ switchAuthState }) => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const setUser = useUserStore((state) => state.setUser)
  const setAuthModalOpen = useAuthModal((state) => state.setAuthModalOpen)
  const sigInMutation = useMutation({ mutationFn: signUp,
    onError: (error) => {
      console.error('Error get user info:', error)
      setAuthModalOpen(false)
      toast.error('Error to sign in')
    }
  })
  const getUserInfo = useMutation({ mutationFn: getInfo,
    onSuccess: (data) => {
      setUser({ ...data.response })
      setAuthModalOpen(false)
      toast.success('Sign in successfully')
    },
    onError: (error) => {
      console.error('Error get user info:', error)
      setAuthModalOpen(false)
      toast.error('Error to sign in')
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      try {
        const response = await sigInMutation.mutateAsync(data)
        if (response) {
          const arrayToken = response.response.token.split('.')
          const tokenDecoded = JSON.parse(atob(arrayToken[1]))

          try {
            await getUserInfo.mutateAsync({ userId: tokenDecoded.userId })
          } catch (error) {
            console.error('Error get user info:', error)
          }
        }
      } catch (error) {
        console.error('Error get user info:', error)
        setAuthModalOpen(false)
        toast.error('Error to sign in')
      }
    }
  })

  return (
    <>
      <Form onSubmit={onSubmit} style={{ paddingTop: '2rem' }}>
        <Form.Group className="mb-4" controlId="validationCustom01">
          <Form.Control
            className='holder'
            type="text"
            placeholder="Username"
            {...register('username', {
              required: {
                value: true,
                message: 'Please provide a username.'
              }
            })}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid #696868'
            }}
          />
          {errors.username && <Form.Text className="text-danger">
            {errors.username.message}
          </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom02">
          <Form.Control
            className='holder'
            type="password"
            placeholder="Password"
            {...register('password', {
              required: {
                value: true,
                message: 'Please provide a password.'
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
          {errors.password && <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom03">
          <Form.Control
            className='holder'
            type="text"
            placeholder="FirstName"
            {...register('firstName', {
              required: {
                value: true,
                message: 'Please provide a firstName.'
              }
            })}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid #696868'
            }}
          />
          {errors.firstName && <Form.Text className="text-danger">
            {errors.firstName.message}
          </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom04">
          <Form.Control
            className='holder'
            type="text"
            placeholder="LastName"
            {...register('lastName', {
              required: {
                value: true,
                message: 'Please provide a lastName.'
              }
            })}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid #696868'
            }}
          />
          {errors.lastName && <Form.Text className="text-danger">
            {errors.lastName.message}
          </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom05">
          <Form.Control
            className='holder'
            type="email"
            placeholder="Email"
            {...register('email', {
              required: {
                value: true,
                message: 'Please provide a email.'
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Incorrect email format. Please provide a valid email.'
              }
            })}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid #696868'
            }}
          />
          {errors.email && <Form.Text className="text-danger">
            {errors.email.message}
          </Form.Text>}
        </Form.Group>

        <Stack gap={2} className="mx-auto mt-3">
          <Button
            type='submit'
            variant="outline-info"
          >
            {getUserInfo.isPending ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : <span>Sign up</span>}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => switchAuthState()}
          >
            Sign In
          </Button>
        </Stack>
      </Form>
    </>
  )
}

export default SignupForm