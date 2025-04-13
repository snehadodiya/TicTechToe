// frontend/src/api.js
import axios from 'axios';

// Axios instance for all API requests
const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Add /api/auth here
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Optional: Only needed if you're using cookies/session-based auth
});

export default API;