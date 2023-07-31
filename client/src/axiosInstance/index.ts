import { baseUrl } from "./constants";
import axios, { AxiosRequestConfig } from "axios";
const config: AxiosRequestConfig = { baseURL: baseUrl };

export const axiosInstance = axios.create(config);
