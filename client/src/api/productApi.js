import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo")
  if (userInfo) {
    const { token } = JSON.parse(userInfo)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getProducts = () => api.get("/api/products")

export const createProduct = (formData) =>
  api.post("/api/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

export const deleteProduct = (id) =>
  api.delete(`/api/products/${id}`)

export const getProductById = (id) =>
  api.get(`/api/products/${id}`)

export const updateProduct = (id, formData) =>
  api.put(`/api/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
