import axiosRequestor from '../request';

const router = '/auth';

export function login(login){
    try{
        axiosRequestor.post(`${router}/login`, {login});
    }catch(error){
        throw error;
    }
}