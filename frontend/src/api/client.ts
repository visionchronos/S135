import axios from 'axios';
import { api } from '../services/api';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
export default api;
