import HeroSlide from '../components/common/HeroSlide'
import tmdbConfigs from '../api/configs/tmdb.configs'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Container, Pagination } from 'react-bootstrap'
import { getMediaList } from '../api/modules/media.api'
import { useEffect, useState } from 'react'
import { useGlobalLoading } from '../store/globalLoadingStore'
import MediaCard from '../components/common/MediaCard'

const MediaList = () => {
  const { mediaType } = useParams()
  const toggleLoading = useGlobalLoading((state) => state.toggleLoading)
  const loading = useGlobalLoading((state) => state.loading)
  const [mediaList, setMediaList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  let mediaCategory = mediaType === 'tv' ? 'top_rated' : 'popular'
  const mediaTypeLabels = {
    movie: 'Movies',
    tv: 'Series'
  }

  const medias = useMutation({
    mutationFn: getMediaList,
    onError: (error) => {
      console.error('Error to removed  from favorite:', error)
      toast.error(error.message)
    }
  })

  const mediasPerPage = async (page) => {
    toggleLoading(true)
    try {
      const data = await medias.mutateAsync({ mediaType, mediaCategory, page })
      setMediaList(data?.response?.results)
      setTotalPages(data?.response?.total_pages)
      setCurrentPage(page)
      toggleLoading(false)
    } catch (error) {
      console.error('Error to add favorite:', error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    mediasPerPage(currentPage)
  }, [mediaType, currentPage])

  const handlePaginationClick = (page) => {
    if (page > 0) setCurrentPage(page)
  }


  return (
    <>
      {!loading && (
        <>
          <HeroSlide mediaType={mediaType}
            mediaCategory={mediaType === 'tv'
              ? tmdbConfigs.mediaCategory.popular
              : tmdbConfigs.mediaCategory.now_playing} />

          <Container>
            <h1
              className="display-4 pt-5 text-info"
              style={{ textShadow: '2px 1px 1px #000' }}>
              {mediaTypeLabels[mediaType]}
              <span className="text-white">.</span>
            </h1>
            <hr style={{ borderBottom: '1px solid #979696', width: '100%', margin: 'auto' }} />
          </Container>
          <Container className="d-flex flex-wrap justify-content-center mt-3 pt-3">
            {mediaList?.map((media, i) => (
              <MediaCard key={`${media.id}-${i}`} media={media} mediaType={mediaType} i={i} />
            ))}
          </Container>
          <Pagination className='mt-3 pb-4 d-flex justify-content-center custom-pagination'>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePaginationClick(currentPage - 1)}
            />
            {[...Array(10).keys()].map((index) => {
              const pageNumber = currentPage - 5 + index
              if (pageNumber > 0 && pageNumber <= totalPages) {
                return (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePaginationClick(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                )
              }
            })}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePaginationClick(currentPage + 1)}
            />
          </Pagination>
        </>
      )}
    </>
  )
}

export default MediaList