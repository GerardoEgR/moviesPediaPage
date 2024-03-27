const main = [
  {
    display: "Home",
    path: "/",
    state: "home"
  },
  {
    display: "Movies",
    path: "/movie",
    state: "movie"
  },
  {
    display: "TV Series",
    path: "/tv",
    state: "tv"
  }
]

const user = [
  {
    display: "Favorites",
    path: "/favorites",
    state: "favorite"
  },
  {
    display: "Reviews",
    path: "/reviews",
    state: "review"
  },
  {
    display: "Password Update",
    path: "/password-update",
    state: "password.update"
  }
]

const menuConfigs = { main, user }

export default menuConfigs