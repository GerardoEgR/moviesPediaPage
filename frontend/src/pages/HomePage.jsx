import HeroSlide from '../components/common/HeroSlide'
import tmdbConfigs from '../api/configs/tmdb.configs'
import { Container, Row } from 'react-bootstrap'
import MediaSlice from '../components/common/MediaSlice'

const HomePage = () => {

  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.now_playing} />

      <Container style={{
        maxWidth: '1366px',
        margin: 'auto',
        paddingBottom: '5rem',
      }}>
        <Row className='mt-5'>
          <MediaSlice mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} type="Movies" categoryType="Popular" />
        </Row>

        <Row className='mt-5'>
          <MediaSlice mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.popular} type="Series" categoryType="Popular" />
        </Row>

        <Row className='mt-5'>
          <MediaSlice mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated} type="Movies" categoryType="Top Rated" />
        </Row>

        <Row className='mt-5 mb-5'>
          <MediaSlice mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated} type="Series" categoryType="Top Rated" />
        </Row>
      </Container>
    </>

  )
}

export default HomePage