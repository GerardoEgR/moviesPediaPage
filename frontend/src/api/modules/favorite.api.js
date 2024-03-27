import privateClient from "../client/private.client"

const favoriteEndpoints = {
  add: "favorites/addFavorites",
  remove: ({ favoriteId }) => `favorites/deleteFavoriteById/${favoriteId}`,
  list: ({ page, size, userId }) => `favorites/getAllFavorites?userId=${userId}&page=${page}&size=${size}`
}

export const add = async ({
  mediaType,
  userId,
  mediaId,
  mediaTitle,
  mediaPoster,
  mediaRate
}) => {
  try {
    const response = await privateClient.post(favoriteEndpoints.add, {
      mediaType,
      userId,
      mediaId,
      mediaTitle,
      mediaPoster,
      mediaRate
    })
    return { response }
  } catch (error) { return { error } }
}

export const remove = async ({ favoriteId }) => {
  try {
    const response = await privateClient.delete(favoriteEndpoints.remove({ favoriteId }))
    return { response }
  } catch (error) { return { error } }
}

export const getList = async ({ userId, page, size }) => {
  try {
      const response = await privateClient.get(favoriteEndpoints.list({ userId, page, size }))
      return { response }
  } catch (error) { return { error } }
}
