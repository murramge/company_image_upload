import axios from "axios";

export const API_URL = "http://115.89.138.200:8082/api/bizContent/";

export const API_AXIOS = axios.create({ baseURL: API_URL });
