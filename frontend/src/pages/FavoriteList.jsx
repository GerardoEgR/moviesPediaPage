import { Button, Card, Container, Nav, Pagination } from "react-bootstrap"
import { useUserStore } from "../store/userStore"
import { AiFillDelete, AiFillPlayCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { routesGen } from "../routes/routes"
import tmdbConfigs from "../api/configs/tmdb.configs"
import { getList, remove } from "../api/modules/favorite.api"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"

const FavoriteList = () => {
  const listFavorites = useUserStore((state) => state.listFavorites)
  const setListFavorites = useUserStore((state) => state.setListFavorites)
  const user = useUserStore((state) => state.user)
  const removeFavorite = useUserStore((state) => state.removeFavorite)
  const [hoverActivo, setHoverActivo] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)

  // console.log('listFavorites', listFavorites, totalElements)

  const getFavoritesList = useMutation({
    mutationFn: getList,
    onSuccess: (data) => {
        setListFavorites(data?.response?.favoritesList || [])
        setTotalPages(data?.response?.totalPages || [])
        setTotalElements(data?.response?.totalSize || 0)
    },
    onError: (error) => {
      console.error('Error to get favorites:', error)
      toast.error('Error to get favorites')
    }
  })

  const deleteFavorites = useMutation({
    mutationFn: remove,
    onSuccess: (data) => {
      toast.success(data.response)
    },
    onError: (error) => {
      console.error('Error to removed  from favorite:', error)
      toast.error('Error to removed  from favorite')
    }
  })

  const onGetFavoritesList = async () => {
    try {
      await getFavoritesList.mutateAsync({ userId: user.id, page: currentPage, size: 10 })
    } catch (error) {
      console.error('Error to get favorites:', error)
    }
  }

  const onRemoveFavorite = async (mediaId) => {

    if (deleteFavorites.isPending) return
    const favorite = listFavorites?.find(e => e?.mediaId.toString() === mediaId.toString())
    try {
      const response = await deleteFavorites.mutateAsync({ favoriteId: favorite.id })
      if (response) {
        removeFavorite(favorite.id)
      }
    } catch (error) {
      console.error('Error to delete favorite:', error)
    }
  }

  const handlePaginationClick = (page) => {
    if (page > 0) setCurrentPage(page)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (user) onGetFavoritesList()
  }, [user, currentPage])


  useEffect(() => {
    if (listFavorites.length === 0 &&totalElements === 1) {
      setTotalElements(0)
    }
  }, [listFavorites.length])

  return (
    <>
      <Container className="pt-5 mt-5">
        <h1 className="display-3"
          style={{ textShadow: '1px 1px 1px #000' }}
        >
          <span className="text-info">Your</span> Favorites ({totalElements ? totalElements : 0}).
        </h1>
        <hr style={{ borderBottom: '1px solid #696868', width: '100%', margin: 'auto' }} />
      </Container>

      <Container className="d-flex flex-wrap justify-content-center mt-3 pt-3">
        {listFavorites?.map((media, i) => (
          <Card
            className="d-flex flex-column align-items-center mb-3"
            bg='dark'
            text='light'
            key={`${media.id}-${i}`}
            border="secondary"
            style={{
              width: '15rem',
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
            <Card.Body className='pb-2' style={{ display: 'flex', width: '100%' }}>
              <Button style={{ width: '100%' }} variant="outline-info" onClick={() => onRemoveFavorite(media.mediaId)}>
                <AiFillDelete className="me-2" size={22} />
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
      {totalElements !== 0 && (
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

export default FavoriteList