import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export const createOrder = (order) =>
  api.post("/api/orders", order);

export const getOrderById = (id) =>
  api.get(`/api/orders/${id}`);

export const getMyOrders = () =>
  api.get("/api/orders/myorders");

export const getAllOrders = () =>
  api.get("/api/orders");

export const markDelivered = (id) =>
  api.put(`/api/orders/${id}/deliver`);
