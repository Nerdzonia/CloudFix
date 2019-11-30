import axios from 'axios';
import { loadToken } from  '../lib/token';

const baseURL = process.env.URL || 'localhost:3000';

const axiosRequest = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

axiosRequest.interceptors.request.use(
    config => {
        const token = loadToken('token');
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        };
        return config;
    },
    error => Promise.reject(error)
);

axiosRequest.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            error.response = {
                status: 444,
                data: { error: `Erro ao mandar para o servidor. ${navigator.onLine ? null : 'Verifique sua internet'}` }
            }
        };
        return Promise.reject(error);
    }
);

export default axiosRequest;