import axios from 'axios';

const URL = process.env.URL || 'localhost:3000';

const axiosRequest = axios.create({
    URL,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
    }
})

axiosRequest.interceptors

export default axiosRequest;