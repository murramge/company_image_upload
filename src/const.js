import axios from "axios";

export const API_URL = "http://115.89.138.200:8082/api/bizContent/";

export const API_AXIOS = axios.create({ baseURL: API_URL });

export const AUTH_API_URL = "http://115.89.138.200:8082/api/auth/";

export const AUTH_API_AXIOS = axios.create({ baseURL: AUTH_API_URL });
