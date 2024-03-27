import Container from 'react-bootstrap/Container';
import { ToastContainer } from "react-toastify"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import routes from './routes/routes'
import PageWrapper from './components/common/PageWrapper'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  return (
    <Container fluid style={{ backgroundColor: '#2b3035', minHeight: '100vh', color: '#ffffff', padding: 0 }}>
    {/* config toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />

      {/* app routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} >
            {routes.map((route, index) => (
              route.index ? (
                <Route index key={index} element={route.state ? (<PageWrapper state={route.state}>{route.element}</PageWrapper>) : route.element} />
              ) : (
                <Route path={route.path} key={index} element={route.state ? (<PageWrapper state={route.state}>{route.element}</PageWrapper>) : route.element} />
              )
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* app routes */}
    </Container>
  )
}

export default App
