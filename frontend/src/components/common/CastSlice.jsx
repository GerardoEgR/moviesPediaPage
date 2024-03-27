import { Card, Carousel, Col, Container, Row } from "react-bootstrap"
import { AiOutlineUser } from "react-icons/ai"
import tmdbConfigs from "../../api/configs/tmdb.configs"

const CastSlice = ({ cast, isSmallScreen }) => {
  return (
    <>
      <Carousel indicators={false} interval={null} className='pt-0 pb-5'>
        {cast && Array.isArray(cast) && cast.map((media, index) => (
          index % 4 === 0 && ( //Muestra cada ítem del carrusel de 4 en 4
            <Carousel.Item key={`${media.id}-${index}`}>
              <div className="d-flex justify-content-around">
                {cast && Array.isArray(cast) && cast.slice(index, index + 4).map((media, i) => ( //Mapea cada tarjeta en grupo de 4 items
                  <Card
                    bg='dark'
                    text='light'
                    key={`${media.id}-${i}`}
                    border="secondary"
                    style={{
                      width: '9rem',
                      padding: '0'
                    }}
                  >
                    {media.profile_path ? (
                      <Card.Img variant="top" src={`${tmdbConfigs.posterPath(media.profile_path)}`} />
                    ) : (
                      <AiOutlineUser className=' justify-content-center align-self-center' style={{
                        width: isSmallScreen ? '3rem' : '9rem',
                        fontSize: '6rem',
                        marginTop: isSmallScreen ? '0' : '3rem',
                        marginBottom: isSmallScreen ? '0' : '3rem',
                      }} />
                    )}
                    <Card.Body className='p-1 justify-content-center'>
                      <Card.Subtitle className="p-0 text-info"
                        style={{
                          textShadow: '2px 1px 1px #000',
                          maxWidth: '100%'
                        }}
                      >
                        {media.name}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Carousel.Item>
          )
        ))}
      </Carousel>
    </>
  )
}

export default CastSlice