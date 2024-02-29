import { baseUrl } from './constants';
import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { baseURL: baseUrl };

export function getJWTHeader(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

export const axiosInstance = axios.create(config);
