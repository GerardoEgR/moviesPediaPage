import { useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup, Nav, Navbar, Stack, ToggleButton } from 'react-bootstrap'
import menuConfigs from '../../configs/menu.configs'
import Logo from './Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserMenu from './UserMenu'
import { useUserStore } from '../../store/userStore'
import { useAuthModal } from '../../store/authModalStore'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { routesGen } from '../../routes/routes'
import { useForm } from 'react-hook-form'

const Topbar = () => {
  const user = useUserStore(state => state.user)
  const setAuthModalOpen = useAuthModal((state) => state.setAuthModalOpen)
  const [navbarBackground, setNavbarBackground] = useState('transparent')
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [radioValue, setRadioValue] = useState('movie')
  const navigate = useNavigate()
  const location = useLocation()

  const radios = [
    { name: 'Movie', value: 'movie' },
    { name: 'Serie', value: 'tv' },
  ]

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      navigate(routesGen.mediaSearch(radioValue, data.title))
      reset()
    }
  })


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarBackground('#2b3035') // Cambiar el color de fondo del Navbar al hacer scroll
      } else {
        setNavbarBackground('transparent') // Restaurar el color de fondo transparente del Navbar
      }
    }
    window.addEventListener('scroll', handleScroll)
    // Eliminar el event listener cuando el componente se desmonte para evitar memory leaks
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Lógica para detectar si la pantalla es pequeña
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576) // Establecer isSmallScreen como verdadero si el ancho de la ventana es menor o igual a 576px
    }
    handleResize() // Llamar a la función una vez para inicializar el estado
    window.addEventListener('resize', handleResize) // Escuchar cambios en el tamaño de la ventana

    return () => {
      window.removeEventListener('resize', handleResize) // Limpiar el event listener al desmontar el componente
    }
  }, [])

  return (
    <>
      <Navbar fixed='top' expand="lg" className="p-md-3"
        style={{
          backgroundColor: navbarBackground,
          transition: 'background-color 0.3s ease',
          borderBottom: navbarBackground !== 'transparent' ? '1px solid #696868' : 'none'
        }}
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"
            style={{
              backgroundColor: '#44484d',
              color: '#bbb9b9',
              borderColor: '#bbb9b9'
            }} />
          <Navbar.Collapse id="navbarScroll"
            style={{
              backgroundColor: isSmallScreen ? '#44484d' : 'transparent',
              borderRadius: '5px'
            }}
          >
            <Nav
              className="me-auto my-2 my-lg-0 lead"
              style={{ maxHeight: '6rem' }}
            >
              {menuConfigs.main.map((item, index) => (
                <Nav.Link
                  as={Link}
                  to={item.path}
                  key={index}
                  href="#"
                  style={{
                    textDecoration: 'none',
                    textShadow: '2px 1px 1px #000',
                    color: item.path === location.pathname ? '#f7f6f6' : '#bbb9b9',
                    position: 'relative',
                    paddingLeft: '0.4rem',
                  }}
                >{item.display}
                </Nav.Link>

              ))}
            </Nav>
            <Form onSubmit={onSubmit} className="me-auto my-2 py-5 py-lg-0 mt-md-5 my-lg-0 d-flex">
              <Stack gap={2}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    aria-label="Search"
                    placeholder="Search..."
                    {...register('title', {
                      required: {
                        value: true,
                        message: `Please provide a valid title of the ${radioValue === 'movie' ? radioValue : 'serie'}.`
                      }
                    })}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #bbb9b9',
                      boxShadow: '1px 1px 1px #000',
                      color: '#ece8e8'
                    }}
                  />

                  {radios.map((radio, idx) => (
                    <ToggleButton
                      className='d-flex align-items-center'
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant='outline-info'
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                      style={{
                        boxShadow: '1px 1px 1px #000'
                      }}
                    >
                      {radioValue === radio.value && <AiOutlineCheckCircle className='me-2' size={20} />}
                      {radio.name}
                    </ToggleButton>
                  ))}
                  <Button type='submit' variant="outline-info"
                    style={{
                      boxShadow: '1px 1px 1px #000'
                    }}
                  >Search</Button>
                </InputGroup>
                {errors.title && <Form.Text className="text-danger"
                  style={{
                    textShadow: '1px 1px 1px #000'
                  }}>
                  {errors.title.message}
                </Form.Text>}
              </Stack>
            </Form>
            {!user &&
              <Button className="d-flex" variant="outline-info"
                style={{
                  marginRight: '4rem',
                  boxShadow: '1px 1px 1px #000'
                }}
                onClick={() => setAuthModalOpen(true)}
              >Login</Button>}
            {user && <UserMenu />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Topbar