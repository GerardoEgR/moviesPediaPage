// Creacion de los servicios del usuario cuando este logueadoimport privateCliente from "../client/private.client"
import privateClient from "../client/private.client"
import publicClient from "../client/public.client"

const userEndpoints = {
  signIn: "/auth/login",
  signUp: "/auth/register",
  getInfo: ({ userId }) => `user/findById/${userId}`,
  passwordUpdate: "user/update"
}

export const signIn = async ({ username, password }) => {
  try {
    const response = await publicClient.post(userEndpoints.signIn, { username, password })
    return { response }
  } catch (error) {return { error }}
}

export const signUp = async ({ username, password, firstName, lastName, email }) => {
  try {
    const response = await publicClient.post(userEndpoints.signUp, { username, password, firstName, lastName, email })
    return { response }
  } catch (error) {return { error }}
}

export const getInfo = async ({ userId }) => {
  try {
    const response = await publicClient.get(userEndpoints.getInfo({ userId }))
    return { response }
  } catch (error) {return { error }}
}

export const passwordUpdate = async (body) => {
  try {
    const response = await privateClient.patch(userEndpoints.passwordUpdate, body)
    return { response }
  } catch (error) {return { error }}
}
