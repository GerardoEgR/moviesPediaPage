const mediaType = {
  movie: 'movie',
  tv: 'tv'
}

const mediaCategory = {
  popular: 'popular',
  top_rated: 'top_rated',
  now_playing: 'now_playing',
}

const backdropPath = (imgEndPoint) => `https://image.tmdb.org/t/p/original${imgEndPoint}`

const posterPath = (imgEndPoint) => `https://image.tmdb.org/t/p/w500${imgEndPoint}`

const youTubePath = (videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youTubePath
}

export default tmdbConfigs