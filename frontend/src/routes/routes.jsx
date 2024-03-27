import HomePage from "../pages/HomePage"
import MediaSearch from "../pages/MediaSearch"
import ProtectedPage from "../components/common/ProtectedPage"
import PasswordUpdate from "../pages/PasswordUpdate"
import FavoriteList from "../pages/FavoriteList"
import ReviewList from "../pages/ReviewList"
import MediaList from "../pages/MediaList"
import MediaDetail from "../pages/MediaDetail"



export const routesGen = {
  home: '/',
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: (type, title) => `/search/${type}/${title}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  passwordUpdate: '/password-update'
}

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: 'home'
  },
  {
    path: '/search/:mediaType/:title',
    element: <MediaSearch />,
    state: 'search'
  },
  {
    path: '/password-update',
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: 'password-update'
  },
  {
    path: '/favorites',
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: 'favorites'
  },
  {
    path: '/reviews',
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: 'reviews'
  },
  {
    path: '/:mediaType',
    element: <MediaList />
  },
  {
    path: '/:mediaType/:mediaId',
    element: <MediaDetail />
  },
]

export default routes