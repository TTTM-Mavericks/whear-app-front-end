
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosRequestConfig } from 'axios';
import { RootStackParamList } from '../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';

// const baseURL = 'https://whear-app.azurewebsites.net';
// const baseURL = 'https://tam.mavericks-tttm.studio';
const baseURL = 'https://host.whearapp.tech';


const axiosInstance = axios.create({
  baseURL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  get: async (url: string, params?: any, accessToken?: string) => {
    try {
      const response = await axiosInstance.get(url, getRequestConfig(accessToken, params));
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  post: async (url: string, data: any, accessToken?: string) => {
    try {
      const response = await axiosInstance.post(url, data, getRequestConfig(accessToken));
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  put: async (url: string, data: any, accessToken?: string) => {
    try {
      const response = await axiosInstance.put(url, data, getRequestConfig(accessToken));
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },

  delete: async (url: string, accessToken?: string) => {
    try {
      const response = await axiosInstance.delete(url, getRequestConfig(accessToken));
      return response.data;
    } catch (error) {
      handleRequestError(error);
    }
  },
};

const handleRequestError = (error: any) => {
  console.error('API Request Error:', error);
  type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
  const navigation = useNavigation<ScreenNavigationProp>();
  navigation.navigate('SignIn');

  throw error;
};

// Helper function to get request configuration with access token in headers
const getRequestConfig = (accessToken?: string, params?: any): AxiosRequestConfig => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = "Bearer " + `${accessToken}`;
  }

  return {
    headers,
    params,
  };
};

export default api;
