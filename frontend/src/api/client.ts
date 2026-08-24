import axios from 'axios';

// Single source of truth for the API base URL.
// Falls back to '/api' for Nginx reverse-proxy setups when the env var is absent.
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
