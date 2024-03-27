import { Container } from 'react-bootstrap'
import { AiOutlineFileSearch } from 'react-icons/ai'

const NoResults = () => {
  return (
    <>
      <Container className='text-center d-flex flex-column justify-content-center align-items-center' style={{ height: '100vh' }}>
        <hr style={{ borderBottom: '1px solid #696868', width: '80%', margin: 'auto' }} />
        <AiOutlineFileSearch size={100} className='my-3' style={{ color: '#979696' }}/>
        <h1 className="display-3" style={{ color: '#696868', textShadow: '1px 1px 1px #000' }}>No results for your search</h1>
        <p className="fs-3 lead" style={{ color: '#979696', textShadow: '1px 1px 1px #000' }}>Try another keyword or other search criteria.</p>
        <hr style={{ borderBottom: '1px solid #696868', width: '80%', margin: 'auto' }} />
      </Container>
    </>
  )
}

export default NoResults