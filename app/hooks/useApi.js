import { useState } from 'react';

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    let response;
    setLoading(true);
    setError(false); // Reset error state
    
    try {
      response = await apiFunc(...args);
      setData(response.data);
    } catch (error) {
      console.error('API Error:', error);
      setError(true);
      // Return error information for better debugging
      response = {
        ok: false,
        error: error.response?.data || error.message || 'Network error',
        status: error.response?.status
      };
    }
    setLoading(false);

    return response;
  };

  return { data, error, loading, request };
};

export default useApi;
