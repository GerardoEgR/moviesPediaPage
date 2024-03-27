import { useEffect, useState } from "react"
import { useUserStore } from "../store/userStore"
import { useMutation } from "@tanstack/react-query"
import { getListReviews, removeReview } from "../api/modules/review.api"
import { toast } from "react-toastify"
import { Button, Card, Container, Nav, Pagination, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AiFillDelete, AiFillPlayCircle } from "react-icons/ai"
import tmdbConfigs from "../api/configs/tmdb.configs"
import { routesGen } from "../routes/routes"


const ReviewList = () => {
  const user = useUserStore((state) => state.user)
  const [reviews, setReviews] = useState([])
  const [hoverActivo, setHoverActivo] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  let size = 8

  const getReviewsList = useMutation({
    mutationFn: getListReviews,
    onSuccess: (data) => {
      setReviews(data?.response?.reviewsList)
      setTotalPages(data?.response?.totalPages)
      setTotalElements(data?.response?.totalSize)
    },
    onError: (error) => {
      console.error('Error to get reviews:', error)
      toast.error('Error to get reviews')
    }
  })

  const deleteReviews = useMutation({
    mutationFn: removeReview,
    onSuccess: (data) => {
      toast.success(data.response)
      onGetReviewsList(user.id, currentPage === 1 ? 1 : currentPage - 1, size)
    },
    onError: (error) => {
      console.error('Error to removed  review:', error)
      toast.error('Error to removed  review')
    }
  })

  const onRemoveReviews = async (reviewId) => {
    try {
      await deleteReviews.mutateAsync({ reviewId: reviewId })
    } catch (error) {
      console.error('Error to add favorite:', error)
    }
  }

  const onGetReviewsList = async (userId, currentPage, size) => {
    try {
      if (user && user.id) {
        await getReviewsList.mutateAsync({ userId: userId, page: currentPage, size: size })
      } else {
        console.error('Unable to get revision list: user is not authenticated or does not have a valid ID')
        toast.error('Unable to get revision list: user is not authenticated or does not have a valid ID')
      }
    } catch (error) {
      console.error('Error getting reviews:', error)
      toast.error('Error getting reviews')
    }
  }

  const handlePaginationClick = (page) => {
    if (page > 0  && page <= totalPages) setCurrentPage(page)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (user) onGetReviewsList(user.id, currentPage, size)
  }, [user, currentPage])

  return (
    <>
      <Container className="pt-5 mt-5">
        <h1 className="display-3"
          style={{ textShadow: '1px 1px 1px #000' }}
        >
          <span className="text-info">Your</span> Reviews ({totalElements ? totalElements : 0}).
        </h1>
        <hr style={{ borderBottom: '1px solid #696868', width: '100%', margin: 'auto' }} />
      </Container>

      <Container className="d-flex flex-wrap justify-content-center mt-3 pt-3">
        {reviews?.map((media, i) => (
          <Card
            className="d-flex flex-column align-items-center mb-3"
            bg='dark'
            text='light'
            key={`${media.id}-${i}`}
            border="secondary"
            style={{
              width: '18rem',
              margin: '0.5rem',
              padding: '0'
            }}
          >
            <Nav.Link as={Link} to={routesGen.mediaDetail(media.mediaType, media.mediaId)}>
              <div className='card-overlay'
                onMouseEnter={() => {
                  setHoverActivo(true)
                  setHoverIndex(i)
                }}
                onMouseLeave={() => {
                  setHoverActivo(false)
                }} >
                <Card.Img variant="top" src={`${tmdbConfigs.posterPath(media.mediaPoster)}`} />
                {hoverActivo && hoverIndex === i && <AiFillPlayCircle className='play-icon' />}
              </div>
            </Nav.Link>
            <Card.Header className="fs-4 lead text-center" style={{
              width: '13rem',
              borderBottom: '1px solid #696868',
              color: '#979696'
            }}>
              {media.mediaTitle}
            </Card.Header>
            <Card.Body className='pb-2' style={{
              display: 'flex',
              width: '100%',
              textShadow: '2px 1px 1px #000'
            }}>
              <Stack direction="vertical" gap={3}>
                <Card.Text>{media.comment}</Card.Text>
                <Button style={{ width: '100%' }} variant="outline-info"
                  onClick={() => onRemoveReviews(media.id)}>
                  <AiFillDelete className="me-2" size={22} />
                </Button>
              </Stack>
            </Card.Body>
            <Card.Footer className="mt-3" style={{
              borderTop: '1px solid #696868',
              color: '#979696'
            }}>
              {media.createdAt}
            </Card.Footer>
          </Card>
        ))}
      </Container>
      {totalElements !== 0 && totalElements !== undefined && (
        <Pagination className='mt-3 pb-4 d-flex justify-content-center custom-pagination'>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePaginationClick(currentPage - 1)}
          />
          {[...Array(totalPages).keys()].map((pageNumber) => {
            const page = pageNumber + 1
            return (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePaginationClick(page)}
              >
                {page}
              </Pagination.Item>
            )
          })}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePaginationClick(currentPage + 1)}
          />
        </Pagination>
      )}
    </>
  )
}

export default ReviewList