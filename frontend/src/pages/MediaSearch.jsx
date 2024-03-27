import { useParams } from 'react-router-dom'
import NoResults from '../components/common/NoResults'
import { getMediaSearch } from '../api/modules/media.api'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useGlobalLoading } from '../store/globalLoadingStore'
import { Container, Pagination } from 'react-bootstrap'
import MediaCard from '../components/common/MediaCard'

const MediaSearch = () => {
  const { mediaType, title } = useParams()
  const toggleLoading = useGlobalLoading((state) => state.toggleLoading)
  const loading = useGlobalLoading((state) => state.loading)
  const [mediaList, setMediaList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const getSearch = useMutation({
    mutationFn: getMediaSearch,
    onError: (error) => {
      console.error('An error occurred:', error)
      toast.error('An error occurred while searching')
    }
  })

  const handleSearch = async (page) => {

    toggleLoading(true)
    try {
      const data = await getSearch.mutateAsync({ mediaType, title, page })
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
    handleSearch(currentPage)
  }, [mediaType, title, currentPage])

  const handlePaginationClick = (page) => {
    if (page > 0) setCurrentPage(page)
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

  return (
    <>
      {!loading && mediaList?.length === 0 && (<NoResults />)}

      {!loading && mediaList?.length > 0 && (
        <>
          <Container className='text-center d-flex flex-column justify-content-center align-items-center' style={{ marginTop: isSmallScreen ? '5rem' : '10rem' }}>
            <hr style={{ borderBottom: '1px solid #696868', width: '80%', margin: 'auto' }} />
            <h1 className="display-3" style={{ color: '#979696', textShadow: '1px 1px 1px #000' }}>Search result</h1>
            <hr style={{ borderBottom: '1px solid #696868', width: '80%', margin: 'auto' }} />
          </Container>

          <Container className="d-flex flex-wrap justify-content-center mt-5">
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

export default MediaSearch