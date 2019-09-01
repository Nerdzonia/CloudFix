import axios from 'axios';
import cookie from 'react-cookies';

const baseURL = process.env.URL || 'localhost:3000';

const axiosRequest = axios.create({
    baseURL,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
    }
})

axiosRequest.interceptors.request.use(
    config => {
        const token = cookie.load('jwt');
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
                data: { message: "Ero ao mandar para o servidor." }
            }
        };
        return Promise.reject(error);
    }
);

export default axiosRequest;