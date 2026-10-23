/**
 * Base API Service Configuration
 *
 * Local Vite uses the `/api` proxy. Production must talk to the Render backend
 * even if Vercel is missing VITE_API_BASE_URL at build time.
 */
const PRODUCTION_API_BASE_URL = 'https://craftedglasses-backend.onrender.com/api';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? PRODUCTION_API_BASE_URL : '/api');

/**
 * Returns the configured API base URL.
 * Import and call this in every page that makes fetch() calls so there is
 * one source of truth and no page accidentally uses a hardcoded relative path
 * in the production build.
 */
export const getApiBase = () => API_BASE_URL;

/**
 * Perform health check call to backend
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
};

export default {
  checkBackendHealth,
  API_BASE_URL,
};
