import { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { getMediaList } from '../../api/modules/media.api'
import { useGlobalLoading } from '../../store/globalLoadingStore'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import MediaCard from './MediaCard'

const MediaSlice = ({ mediaType, mediaCategory, type, categoryType }) => {

  const page = '1'
  const loading = useGlobalLoading((state) => state.loading)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const itemsToShow = isSmallScreen ? 2 : 5

  const { data: medias, status, error } = useQuery({
    queryKey: ["medias", mediaType, mediaCategory, page],
    queryFn: () => getMediaList({ mediaType, mediaCategory, page }),
  })
  const mediaList = medias?.response?.results

  useEffect(() => {
    if ((error && status === 'success') || (mediaList === undefined && status === 'success')) toast.error('Error to get media list')
  }, [mediaType, mediaCategory, status])

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
      {status === 'success' && !loading &&
        <>
          <h1
            className="display-4 pt-5"
            style={{ textShadow: '2px 1px 1px #000' }}>
            <span className="text-info">{categoryType}</span> {type}.
          </h1>
          <hr style={{ borderBottom: '1px solid #979696', width: '100%', margin: 'auto' }} />
          <Carousel indicators={false} className='pt-3' >
            {mediaList?.map((media, index) => (
              index % itemsToShow  === 0 && ( //Muestra cada ítem del carrusel de 4 en 4
                <Carousel.Item key={`${media.id}-${index}`}>
                  <div className="d-flex justify-content-around">
                    {mediaList?.slice(index, index + itemsToShow ).map((media, i) => ( //Mapea cada tarjeta en grupo de 4 items
                      <MediaCard key={`${media.id}-${i}`} media={media} mediaType={mediaType} i={i} />
                    ))}
                  </div>
                </Carousel.Item>
              )
            ))}
          </Carousel>
        </>
      }
    </>
  )
}

export default MediaSlice