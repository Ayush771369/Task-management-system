import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login    = (data) => api.post('/auth/login', data);

// Tasks
export const getTasks    = ()         => api.get('/tasks');
export const createTask  = (data)     => api.post('/tasks', data);
export const deleteTask  = (id)       => api.delete(`/tasks/${id}`);

export default api;
