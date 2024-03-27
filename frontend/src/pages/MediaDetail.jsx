import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMediaDetail } from '../api/modules/media.api'
import { useGlobalLoading } from '../store/globalLoadingStore'
import tmdbConfigs from '../api/configs/tmdb.configs'
import { Button, Card, Col, Container, Row, Spinner, Stack } from 'react-bootstrap'
import { AiFillHeart, AiFillStar, AiOutlineComment, AiOutlineHeart, AiOutlineTeam } from 'react-icons/ai'
import VideosSlice from '../components/common/VideosSlice'
import CastSlice from '../components/common/CastSlice'
import { toast } from 'react-toastify'
import { useUserStore } from '../store/userStore'
import { useAuthModal } from '../store/authModalStore'
import { add, getList, remove } from '../api/modules/favorite.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import MediaReview from '../components/common/MediaReview'

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams()
  const toggleLoading = useGlobalLoading((state) => state.toggleLoading)
  const loading = useGlobalLoading((state) => state.loading)
  const user = useUserStore((state) => state.user)
  const listFavorites = useUserStore((state) => state.listFavorites)
  const setListFavorites = useUserStore((state) => state.setListFavorites)
  const addFavorite = useUserStore((state) => state.addFavorite)
  const removeFavorite = useUserStore((state) => state.removeFavorite)
  const setAuthModalOpen = useAuthModal((state) => state.setAuthModalOpen)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [bodyMedia, setBodyMedia] = useState(null)

  const { data: MediaDetail, status, error } = useQuery({
    queryKey: ["mediaDetail", mediaType, mediaId],
    queryFn: () => getMediaDetail({ mediaType, mediaId }),
  })
  const media = MediaDetail?.response?.details
  const genres = MediaDetail?.response?.details?.genres?.slice(0, 2)
  const cast = MediaDetail?.response?.cast?.cast

  const getFavoritesList = useMutation({
    mutationFn: getList,
    onSuccess: (data) => {
      setListFavorites(data?.response?.favoritesList || [])
    },
    onError: (error) => {
      console.error('Error to get favorites:', error)
      toast.error('Error to get favorites')
    }
  })

  const addFavorites = useMutation({
    mutationFn: add,
    onSuccess: (data) => {
      addFavorite(data.response)
      setIsFavorite(true)
      toast.success('Added to favorites successfully')
    },
    onError: (error) => {
      console.error('Error to add favorite:', error)
      toast.error('Error to added favorite')
    }
  })

  const deleteFavorites = useMutation({
    mutationFn: remove,
    onSuccess: (data) => {
      toast.success(data.response)
      setIsFavorite(false)
    },
    onError: (error) => {
      console.error('Error to removed  from favorite:', error)
      toast.error('Error to removed  from favorite')
    }
  })

  const onGetFavoritesList = async () => {
    try {
      if (user && user.id) {
        await getFavoritesList.mutateAsync({ userId: user.id, page: 1, size: 100 } || [])
      } else {
        console.error('User is undefined')
      }
    } catch (error) {
      console.error('Error to get favorites:', error)
    }
  }

  const onFavoriteClick = async () => {

    if (!user) return setAuthModalOpen(true)
    if (addFavorites.isPending) return
    if (isFavorite) {
      onRemoveFavorite()
      return
    }

    try {
        await addFavorites.mutateAsync(bodyMedia)
    } catch (error) {
      console.error('Error to add favorite:', error)
    }
  }

  const onRemoveFavorite = async () => {

    if (deleteFavorites.isPending) return
    const favorite = listFavorites?.find(e => e?.mediaId.toString() === media?.id.toString())

    try {
      const response = await deleteFavorites.mutateAsync({ favoriteId: favorite.id })
      if (response) {
        removeFavorite(favorite.id)
      }
    } catch (error) {
      console.error('Error to delete favorite:', error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (status === 'pending' || status === 'idle') toggleLoading(true)
    if (status === 'success' || status === 'error') {
      toggleLoading(false)
      if (media && media.id && user && user.id) {
        const body = {
          mediaId: media?.id,
          userId: user ? user?.id : 0,
          mediaTitle: media.title || media.name,
          mediaType: mediaType,
          mediaPoster: media.poster_path,
          mediaRate: media.vote_average
        }
        setBodyMedia(body);
      }
    }
    if (error) toast.error(err.message)
  }, [mediaType, mediaId, status, toggleLoading, user])

  useEffect(() => {
    if (user !== null) onGetFavoritesList()
  }, [user])

  useEffect(() => {
    if (user && Array.isArray(listFavorites) && listFavorites.length > 0) {
      const isFavorite = listFavorites.some(favorite => favorite.mediaId.toString() === mediaId.toString())
      setIsFavorite(isFavorite)
    } else {
      setIsFavorite(false)
    }
  }, [user, listFavorites, mediaId])

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
    <>
      {status === 'success' && !loading && (
        <Container fluid style={{ paddingTop: isSmallScreen ? '3rem' : '5rem' }}>
          <Row className="mt-5 mb-lg-5 justify-content-center">
            <Col lg={3} md={12} sm={12} className={isSmallScreen ? 'ms-0' : 'ms-5'}>
              <Card
                bg='dark'
                text='light'
                border="secondary"
                style={{
                  width: isSmallScreen ? '18rem' : '28rem',
                  margin: '0.5rem',
                  padding: '0'
                }}>
                <Card.Img
                  src={`${tmdbConfigs.posterPath(media?.poster_path || media?.backdrop_path)}`}
                />
              </Card>
            </Col>

            <Col lg={5} md={12} sm={12} className='ms-3'>
              <Stack direction="horizontal" gap={3}>
                <h1 className="display-3"
                  style={{ textShadow: '2px 1px 1px #000' }}
                >
                  {mediaType === 'movie' ? media?.title : media?.original_name}
                </h1>
                <Button variant='link'
                  className='ms-auto text-white'
                  onClick={onFavoriteClick}
                  style={{
                    fontSize: '2.5rem',
                    marginLeft: '0.3rem',
                    cursor: 'pointer'
                  }}>
                  {addFavorites.isPending || deleteFavorites.isPending && (
                    <Spinner
                      className='lead'
                      as="span"
                      animation="border"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  {!isFavorite && !addFavorites.isPending && !deleteFavorites.isPending && (<AiOutlineHeart />)}
                  {isFavorite && !addFavorites.isPending && !deleteFavorites.isPending && (<AiFillHeart />)}
                </Button>
              </Stack>
              <Stack direction="horizontal" gap={3}>
                <p className='fs-5 ms-0 text-info lead'
                  style={{
                    textShadow: '2px 1px 1px #000',
                  }}>
                  {media?.release_date ? media?.release_date.split("-")[0] : media?.first_air_date.split("-")[0]}
                </p>

                {genres?.map((genre, index) => (
                  <p key={`${genre.Id}-${index}`} className='fs-5 ms-0 text-info lead'
                    style={{
                      textShadow: '2px 1px 1px #000',
                    }}>{genre?.name}</p>
                ))}

                <p className='fs-5 ms-0 text-info lead'
                  style={{
                    textShadow: '2px 1px 1px #000',
                    display: 'flex', alignItems: 'center'
                  }}>
                  <AiFillStar className='text-info'
                    style={{
                      marginRight: '0.5rem',
                      marginLeft: '0.3rem',
                    }} />
                  {parseFloat(media?.vote_average).toFixed(1)}
                </p>

              </Stack>
              <p className='fs-5 pt-2 lead'
                style={{
                  textShadow: '2px 1px 1px #000',
                  color: '#ece8e8',
                  margin: '0',
                  textAlign: 'left',
                  maxWidth: '100%',
                }}>{media?.overview}</p>

              <p className='fs-4 pt-5 ms-0 lead'
                style={{
                  textShadow: '2px 1px 1px #000',
                }}>
                Cast
                <AiOutlineTeam className='ms-2 mb-2' />
              </p>

              <CastSlice cast={cast} isSmallScreen={isSmallScreen} />
            </Col>
          </Row>

          <Row >
            <VideosSlice mediaType={mediaType} mediaId={mediaId} />
          </Row>

          <Row>
            <h1 className="display-4 pb-5 pt-5 pt-lg-2 text-info"
              style={{ textShadow: '2px 1px 1px #000', paddingLeft: isSmallScreen ? '0' : '10rem' }}
            >Reviews<AiOutlineComment className='ms-3' /></h1>

            <MediaReview bodyMedia={bodyMedia} />
          </Row>
        </Container>
      )}
    </>
  )
}

export default MediaDetail