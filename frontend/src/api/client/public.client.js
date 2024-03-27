import axios from "axios"
import queryString from "query-string"

const baseURL = "http://localhost:8080"

const publicClient = axios.create({ 
  baseURL: baseURL,
  paramsSerializer: params => queryString.stringify(params)
});

publicClient.interceptors.request.use(async config => {
  config.headers['Content-Type'] = 'application/json';
  return config;
}, error => {
  return Promise.reject(error);
});

publicClient.interceptors.response.use(response => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, error => {
  throw error.response.data;
});

export default publicClient