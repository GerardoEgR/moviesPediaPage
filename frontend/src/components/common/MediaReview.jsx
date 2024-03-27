import { useCallback, useEffect, useState } from "react"
import ReviewForm from "./ReviewForm"
import { geAllReviews, removeReview } from "../../api/modules/review.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Button, Card, Container, Stack } from "react-bootstrap"
import { AiOutlineDelete } from "react-icons/ai"
import { useUserStore } from "../../store/userStore"
import TextAvatar from "./TextAvatar"
import { toast } from "react-toastify"

const MediaReview = ({ bodyMedia }) => {

  const user = useUserStore((state) => state.user)
  const [reviewsList, setReviewsList] = useState([])
  const [reviews, setReviews] = useState([])
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [reviewsToShow, setReviewsToShow] = useState(3)
  const loadMoreIncrement = 3

  const { data, status, error, refetch } = useQuery({
    queryKey: ["listAllReviews"],
    queryFn: () => geAllReviews(),
  })

  const deleteReviews = useMutation({
    mutationFn: removeReview,
    onSuccess: (data) => {
      toast.success(data.response)
      refetch()
    },
    onError: (error) => {
      console.error('Error to removed  review:', error)
      toast.error('Error to removed  review')
    }
  })

  const filterReviewsByMediaId = useCallback(() => {
    if (Array.isArray(reviewsList) && reviewsList.length > 0) {
      const reviewsByMediaId = reviewsList.filter((review) => review?.mediaId === bodyMedia?.mediaId)
      setReviews(reviewsByMediaId)
    }
  }, [reviewsList, bodyMedia])
  

  useEffect(() => {
    if (status === 'success' && data && data?.response) {
      setReviewsList(data.response)
    }
    if (error) {
      toast.error(error.message)
    }
  }, [data, status, error])


  useEffect(() => {
    if (user) filterReviewsByMediaId()
  }, [filterReviewsByMediaId])


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


  useEffect(() => {
    if (reviewsList.length === 0) {
      setReviews([])
    }

    if (typeof reviewsList === 'string' || reviewsList instanceof String && reviews.length === 1) {
      setReviews([])
      refetch()
    }
  }, [reviewsList.length])


  const commentAdded = () => {
    refetch()
  }


  const onRemoveReviews = async (reviewId) => {
    try {
      await deleteReviews.mutateAsync({ reviewId: reviewId })
      setReviewsList(reviewsList.filter(review => review.id !== reviewId))
    } catch (error) {
      console.error('Error to add favorite:', error)
    }
  }

  return (
    <>
      {user && bodyMedia && (
        <ReviewForm
          bodyReview={{
            userId: user.id || '',
            username: user.username || '',
            mediaId: bodyMedia?.mediaId || '',
            mediaType: bodyMedia?.mediaType || '',
            mediaTitle: bodyMedia?.mediaTitle || '',
            mediaPoster: bodyMedia?.mediaPoster || ''
          }}
          commentAdded={commentAdded} />)}

      <Container className="mb-5 d-flex justify-content-center flex-wrap">
        {reviews.length > 0 && reviews?.slice(0, reviewsToShow).reverse().map((review, index) => (
          <Card
            key={`${review.Id}-${review.mediaId}-${index}`}
            className="mb-3 lead"
            style={{
              width: isSmallScreen ? '100%' : '85%',
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none'
            }}>
            <Card.Body style={{ textShadow: '2px 1px 1px #000' }}>
              <Stack direction={isSmallScreen ? "column" : "horizontal"}
                gap={2} className={isSmallScreen ? "none" : "align-items-center"}>
                <Card.Title className="fs-3 me-md-3 lead d-flex align-items-center">
                  <TextAvatar text={review.username} />
                  {review.username}
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: isSmallScreen ? '0.9rem' : '1.1rem',
                    paddingBottom: isSmallScreen ? '0.5rem' : '0',
                    color: '#979696',

                  }}>{review.createdAt}</Card.Text>
              </Stack>
              <Card.Text>{review.comment}</Card.Text>
              {user && user?.username === review?.username && user.id === review?.userId && (
                <Button className="d-flex" variant="outline-info" onClick={() => onRemoveReviews(review.id)}>
                  <AiOutlineDelete className="me-2" size={22} />
                  Remove
                </Button>
              )}
            </Card.Body>
          </Card>))}
      </Container>
      {reviews.length > reviewsToShow && (
        <Container className="text-center d-grid col-10">
          <Button className="mb-5" variant="outline-info"
            onClick={() => setReviewsToShow(prev => prev + loadMoreIncrement)}
          >Load More</Button>
        </Container>
      )}
    </>
  )
}

export default MediaReview