import axiosRequestor from '../request';
import { setToken } from '../../lib/token';

class auth {
    baseUrl = '/auth';
    
     async login(login){
        try{
           let { data } = await axiosRequestor.post(`${this.baseUrl}/authenticate`, login);
           setToken('token', data.token || '', 30);
           return data;
        }catch(error){
            // console.log(error)
            return error.response.data;
        }
    }
}

export default new auth();