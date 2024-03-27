import { useEffect } from 'react'
import { Button, Carousel, Stack } from 'react-bootstrap'
import { getMediaList } from '../../api/modules/media.api'
import { getGenresList } from '../../api/modules/genre.api'
import { toast } from 'react-toastify'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import { AiFillStar } from "react-icons/ai"
import { useGlobalLoading } from '../../store/globalLoadingStore'
import { AiFillPlayCircle } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { routesGen } from '../../routes/routes'
import { useQuery } from '@tanstack/react-query'

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const page = '1'
  const toggleLoading = useGlobalLoading((state) => state.toggleLoading)
  const loading = useGlobalLoading((state) => state.loading)

  const { data: movie, status, error } = useQuery({
    queryKey: ["movies", mediaType, mediaCategory, page],
    queryFn: () => getMediaList({ mediaType, mediaCategory, page }),
  })
  const movieList = movie?.response?.results

  const { data: genre, error: genreError } = useQuery({
    queryKey: ["genres", mediaType],
    queryFn: () => getGenresList({ mediaType }),
  })
  const genreList = genre?.response?.genres

  useEffect(() => {
    if (status === 'pending' || status === 'idle') toggleLoading(true)
    if (status === 'success' || status === 'error') toggleLoading(false)
    if (error || genreError) toast.error(err.message)
  }, [mediaType, mediaCategory, status, toggleLoading])

  return (
    <>
      {status === 'success' && !loading && (
        <Carousel>
          {movieList?.map((movie, index) => (
            <Carousel.Item key={`${movie.id}-${index}`}>
              <div className="image-overlay">
                <img
                  className="d-block w-100"
                  src={`${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)}`}
                  alt="First slide"
                />
              </div>
              <Carousel.Caption
                style={{
                  left: '9%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  position: 'absolute',
                  top: '4rem',
                  height: '100%',
                  width: '50%',
                }}>
                <h1 className="display-3 pb-3 d-none d-md-block"
                  style={{
                    textShadow: '2px 1px 1px #000',
                    margin: '0',
                    textAlign: 'left',
                    color: '#ece8e8',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >{movie.title || movie.name}</h1>
                <Stack direction="horizontal" gap={2}>
                  <p className='fs-4 d-none d-md-block pe-2 text-info'
                    style={{ textShadow: '2px 1px 1px #000', marginTop: '0.2rem', marginRight: '2rem' }}
                  >
                    <AiFillStar className='text-info' style={{
                      fontSize: '2rem',
                      marginBottom: '0.3rem',
                      marginRight: '0.5rem',
                      marginLeft: '1rem',
                    }} />
                    {parseFloat(movie.vote_average).toFixed(1)}
                  </p>
                  {movie.genre_ids.slice(0, 2).map((genreId, index, array) => (
                    <div key={`${genreId}-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
                      <p
                        className='fs-4 d-none d-md-block text-info'
                        style={{
                          textShadow: '2px 1px 1px #000',
                          marginLeft: index !== 0 ? '2rem' : '0',
                        }}
                      >
                        {genreList?.find(genre => genre.id === genreId)?.name}
                      </p>
                      {index !== array.length - 1 && <span>&nbsp;</span>}
                    </div>
                  ))}
                </Stack>
                <p className="lead pb-5 fs-4 d-none d-lg-block"
                  style={{
                    textShadow: '2px 1px 1px #000',
                    color: '#ece8e8',
                    margin: '0',
                    textAlign: 'left',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >{movie.overview}</p>
                <Button
                  className='d-none d-lg-block'
                  variant="outline-info"
                  as={Link} to={routesGen.mediaDetail(mediaType, movie.id)}
                  style={{
                    fontSize: '1.2rem',
                    boxShadow: '1px 1px 1px #000',
                    zIndex: 999
                  }}
                >
                  <AiFillPlayCircle style={{ marginBottom: '0.3rem', marginRight: '0.5rem' }} />
                  Watch Now
                </Button>
              </Carousel.Caption>
            </Carousel.Item>

          ))}
        </Carousel >
      )}
    </>
  )
}

export default HeroSlide