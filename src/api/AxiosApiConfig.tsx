
import axios from 'axios';

const baseURL = 'https://whear-app.azurewebsites.net'; 

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  get: async (url: any, params?: any) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  post: async (url: any, data: any) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  put: async (url: any, data: any) => {
    try {
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  delete: async (url:any) => {
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },
};

const handleRequestError = (error: any) => {
  console.error('API Request Error:', error);
  throw error; 
};

export default api;
