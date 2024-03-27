import axios from "axios"
import queryString from "query-string"

const baseURL = "http://localhost:8080"

const privateClient = axios.create({ 
  baseURL: baseURL,
  paramsSerializer: params => queryString.stringify(params)
});

privateClient.interceptors.request.use(async config => {
  const token = localStorage.getItem("actkn")
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

privateClient.interceptors.response.use(response => {
  if (response && response.data) {
    return response.data
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default privateClient