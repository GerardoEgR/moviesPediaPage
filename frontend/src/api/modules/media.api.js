import publicClient from "../client/public.client"

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) => `/moviesApi/getMovies?mediaType=${mediaType}&mediaCategory=${mediaCategory}&page=${page}`,
  detail: ({ mediaType, mediaId }) => `/moviesApi/details/${mediaType}/${mediaId}`,
  videos: ({ mediaType, mediaId }) => `/moviesApi/videos/${mediaType}/${mediaId}`,
  search: ({ mediaType, title, page }) => `/moviesApi/search?mediaType=${mediaType}&title=${title}&page=${page}`
}

export const getMediaList = async ({ mediaType, mediaCategory, page }) => {
  try {
    const response = await publicClient.get(mediaEndpoints.list({ mediaType, mediaCategory, page }))
    return { response }
  } catch (error) { return  { error } }
}

export const getMediaDetail = async ({ mediaType, mediaId }) => {
  try {
    const response = await publicClient.get(mediaEndpoints.detail({ mediaType, mediaId }))
    return { response }
  } catch (error) { return  { error } }
}

export const getVideos = async ({ mediaType, mediaId }) => {
  try {
    const response = await publicClient.get(mediaEndpoints.videos({ mediaType, mediaId }))
    return { response }
  } catch (error) { return  { error } }
}

export const getMediaSearch = async ({ mediaType, title, page }) => {
  try {
    const response = await publicClient.get(mediaEndpoints.search({ mediaType, title, page }))
    return { response }
  } catch (error) { return  { error } }
}
