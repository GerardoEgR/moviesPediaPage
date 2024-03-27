import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import tmdbConfigs from '../../api/configs/tmdb.configs'
import { Card, Nav, Stack } from 'react-bootstrap'
import { AiFillPlayCircle, AiFillStar } from 'react-icons/ai'
import { routesGen } from '../../routes/routes'

const MediaCard = ({ media, mediaType, i }) => {
  const [hoverActivo, setHoverActivo] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

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
      <Card
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
        <Nav.Link as={Link} to={routesGen.mediaDetail(mediaType, media.id)}>
          <div className='card-overlay'
            onMouseEnter={() => {
              setHoverActivo(true)
              setHoverIndex(i)
            }}
            onMouseLeave={() => {
              setHoverActivo(false)
            }} >
            <Card.Img variant={!isSmallScreen ? 'top' : undefined} src={`${tmdbConfigs.posterPath(media.poster_path)}`} />
            {hoverActivo && hoverIndex === i && <AiFillPlayCircle className='play-icon' />}
          </div>
        </Nav.Link>
        {!isSmallScreen && (
          <Card.Body className='pb-2'>
            <Card.Title className='text-info'
              style={{
                textShadow: '2px 1px 1px #000',
                maxWidth: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}
            >
              {mediaType === 'movie' ? media.title : media.original_name}
            </Card.Title>
            <div>
              <Stack direction="horizontal" gap={2}>
                <Card.Text className='ms-0 text-info'
                  style={{
                    textShadow: '2px 1px 1px #000',
                    margin: '0',
                    left: '0'
                  }}>{mediaType === 'movie' && media.release_date ? media.release_date.split("-")[0] : mediaType === 'tv' && media.first_air_date.split("-")[0]}</Card.Text>
                <Card.Text className='ms-auto text-info'
                  style={{
                    textShadow: '2px 1px 1px #000',
                    display: 'flex', alignItems: 'center'
                  }}>
                  <AiFillStar className='text-info'
                    style={{
                      marginRight: '0.5rem',
                      marginLeft: '1rem',
                    }} />
                  {parseFloat(media.vote_average).toFixed(1)}
                </Card.Text>
              </Stack>
            </div>
          </Card.Body>
        )}
      </Card>
    </>
  )
}

export default MediaCard