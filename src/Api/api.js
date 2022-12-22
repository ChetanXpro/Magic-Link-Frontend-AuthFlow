import axios, { AxiosError } from "axios";

// import useAuth from "./useAuth";
// import useRefreshToken from "./useRefreshToken";

const API_BASE_URL = "http://localhost:5000/";
export const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export const apiPrivateInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export const login = async (payload) => {
  try {
    const request = await apiInstance.post("/link", payload);
    return request?.data;
  } catch (err) {
    const error = err 
    return Promise.reject(error.response);
  }
};
export const signup = async (payload) => {
  try {
    const request = await apiInstance.post("/user", payload);

    return request?.data;
  } catch (err) {
    const error = err
    return Promise.reject(error.response);
  }
};

export const getUser = async (interceptors) => {
  try {
    const request = await interceptors.get("/user");
    return request?.data;
  } catch (err) {
    const error = err 
    return Promise.reject(error.response);
  }
};
