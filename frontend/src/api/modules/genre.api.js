import publicClient from "../client/public.client"

const genreEndpoints = {
  list: ({ mediaType }) => `/moviesApi/genres?mediaType=${mediaType}`
}

export const getGenresList = async ({ mediaType }) => {
  try {
    const response = await publicClient.get(genreEndpoints.list({ mediaType }))

    return { response }
  } catch (error) { return { error } }
}
