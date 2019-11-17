import axiosRequestor from '../request';

class System {
    baseUrl = '/system';

    async listAllSystems(){
        const { data } = await axiosRequestor.get(`${this.baseUrl}/listAll`);

        return data;
    }

    async delete(id){
        const {data} = await axiosRequestor.get(`${this.baseUrl}/delete`, { id });

        return data;
    }

    async add(name){
        const {data} = await axiosRequestor.post(`${this.baseUrl}/add`, { name });

        return data;
    }

}

export default new System();