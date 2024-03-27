import privateClient from "../client/private.client"

const reviewEndpoints = {
  add: "reviews/addReviews",
  remove: ({ reviewId }) => `reviews/deleteReviewById/${reviewId}`,
  listByUserId: ({ userId, page, size }) =>  `reviews/getAllReviewsByUserId?userId=${userId}&page=${page}&size=${size}`,
  getAll: "reviews/getAllReviews"
}

export const addReview = async ({
  userId,
  username,
  mediaId,
  comment,
  createdAt,
  mediaType,
  mediaTitle,
  mediaPoster
}) => {
  try {
    const response = await privateClient.post(reviewEndpoints.add, {
      userId,
      username,
      mediaId,
      comment,
      createdAt,
      mediaType,
      mediaTitle,
      mediaPoster
    })
    return { response }
  } catch (error) { return { error } }
}

export const removeReview = async ({ reviewId }) => {
  try {
    const response = await privateClient.delete(reviewEndpoints.remove({ reviewId }))
    return { response }
  } catch (error) { return { error } }
}

export const getListReviews = async ({ userId, page, size }) => {
  try {
    const response = await privateClient.get(reviewEndpoints.listByUserId({ userId, page, size }))
    return { response }
  } catch (error) { return { error } }
}

export const geAllReviews = async () => {
  try {
    const response = await privateClient.get(reviewEndpoints.getAll)
    return { response }
  } catch (error) { return { error } }
}
