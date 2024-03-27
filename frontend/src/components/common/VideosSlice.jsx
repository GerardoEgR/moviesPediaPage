import { Carousel, Col, Container, Row } from "react-bootstrap"
import tmdbConfigs from "../../api/configs/tmdb.configs"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useGlobalLoading } from "../../store/globalLoadingStore"
import { getVideos } from "../../api/modules/media.api"
import { AiFillYoutube } from "react-icons/ai"
import YouTubePlayer from "react-player/youtube"

const VideosSlice = ({ mediaType, mediaId }) => {
  const toggleLoading = useGlobalLoading((state) => state.toggleLoading)
  const [videos, setVideos] = useState([])
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const getAllVideos = async () => {
    const { response, err } = await getVideos({ mediaType, mediaId })
    toggleLoading(false)
    if (response) setVideos(response.results)
    if (err) toast.error(err.message)
  }

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
    getAllVideos()
  }, [mediaType, mediaId])

  return (
    <>
      {videos.length > 0 && (
        <Container fluid className="p-4">
          <hr style={{ borderBottom: '1px solid #696868', width: '80%', margin: 'auto' }} />
          <Row className="m-0 d-flex align-items-center justify-content-center">
            <Col >
              <h1 className="display-4 pb-5 pt-0 pt-lg-2 text-info"
                style={{ textShadow: '2px 1px 1px #000', paddingLeft: isSmallScreen ? '0' : '10rem' }}
              >Videos<AiFillYoutube className='ms-3' /></h1>
              <Carousel indicators={false} interval={null} className='pt-0 pb-5'>
                {videos.map((media, index) => (
                  <Carousel.Item key={`${media.id}-${index}`}>
                    <div className="d-flex justify-content-around">
                      <YouTubePlayer
                        controls
                        width='80rem'
                        height={isSmallScreen ? '10rem' : '40rem'}
                        url={`${tmdbConfigs.youTubePath(media?.key)}`}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      )}
      <hr style={{ borderBottom: '1px solid #696868', width: '78%', margin: 'auto' }} />
    </>
  )
}

export default VideosSlice