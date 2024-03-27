import { useEffect, useState } from "react"
import { Button, Container, Form, Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { AiOutlineSend } from "react-icons/ai"
import TextAvatar from "./TextAvatar"
import { addReview } from "../../api/modules/review.api"
import { useMutation } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "react-toastify"

const ReviewForm = ({ bodyReview, commentAdded }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const reviewAdded = useMutation({
    mutationFn: addReview,
    onSuccess: (data) => {
      toast.success(data.response)
      commentAdded()
    },
    onError: (error) => {
      console.error('Error to add review:', error)
      toast.error('Error to add review')
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      const body = {
        userId: bodyReview.userId,
        username: bodyReview.username,
        mediaId: bodyReview.mediaId,
        comment: data.review,
        createdAt: dayjs(new Date()).format("DD-MM-YYYY HH:mm:ss"),
        mediaType: bodyReview.mediaType,
        mediaTitle: bodyReview.mediaTitle,
        mediaPoster: bodyReview.mediaPoster
      }
      
      try {
        await reviewAdded.mutateAsync(body)
      } catch (error) {
        console.error('Error to add review:', error)
      }
    }
    reset()
  })

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Container className="mt-3 mb-5" style={{ width: isSmallScreen ? "100%" : "50%" }}>

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label
            className="fs-3 lead d-flex align-items-center"
            style={{ textShadow: '2px 1px 1px #000' }}
          >
            {bodyReview.username && <TextAvatar text={bodyReview.username} />}
            {bodyReview.username}
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register('review', {
              required: {
                value: true,
                message: 'This field is required'
              }
            })}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid #696868'
            }}
          />
          {errors.review && <Form.Text className="text-danger">
            {errors.review.message}
          </Form.Text>}
        </Form.Group>
        <Button
          type='submit'
          variant="outline-info"
        >
          <AiOutlineSend className="me-2" />
          {reviewAdded.isPending 
              ? <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true" /> 
              : <span>Post</span>}
        </Button>
      </Form>
    </Container>
  )
}

export default ReviewForm