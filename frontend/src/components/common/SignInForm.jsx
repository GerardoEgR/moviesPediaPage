import { Button, Form, Spinner, Stack } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { signIn, getInfo } from '../../api/modules/user.api'
import { useUserStore } from '../../store/userStore'
import { useAuthModal } from '../../store/authModalStore'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

const SigninForm = ({ switchAuthState }) => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const setUser = useUserStore((state) => state.setUser)
  const setAuthModalOpen = useAuthModal((state) => state.setAuthModalOpen)
  
  const sigInMutation = useMutation({ mutationFn: signIn,
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
          const token = response.response.token
          if (token) {
            const arrayToken = token.split('.')

            if (arrayToken.length === 3) {
              const [, payloadBse64,] = arrayToken
              const payload = JSON.parse(atob(payloadBse64))
              
              if (payload && payload.userId) {
                try {
                  await getUserInfo.mutateAsync({ userId: payload.userId })
                } catch (error) {
                  console.error('Error get user info:', error)
                } 
              } else {
                console.error('Error get user info: Invalid token')
              }
            } else {
              console.error('Error get user info: Invalid token')
            }
          } else {
            console.error('Error get user info: Invalid token')
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
                message: 'Please provide a valid username.'
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
                message: 'Please provide a valid password.'
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
              /> : <span>Sign In</span>}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => switchAuthState()}
          >
            Sign Up
          </Button>
        </Stack>
      </Form>
    </>
  )
}

export default SigninForm