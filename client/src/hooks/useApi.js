import { useState, useCallback } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/loaderSlice';

export const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const callApi = useCallback(async (apiFunction, showGlobalLoader = true, showSuccessMessage = true) => {
    try {
      setLoading(true);
      setError(null);
      
      if (showGlobalLoader) {
        dispatch(showLoading());
      }

      const response = await apiFunction();
      
      if (response.success) {
        setData(response.data);
        if (showSuccessMessage && response.message) {
          message.success(response.message);
        }
        return response;
      } else {
        setError(response.message);
        message.error(response.message);
        return response;
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      message.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
      if (showGlobalLoader) {
        dispatch(hideLoading());
      }
    }
  }, [dispatch]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    error,
    loading,
    callApi,
    reset
  };
};