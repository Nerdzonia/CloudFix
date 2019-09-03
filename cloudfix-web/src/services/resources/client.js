import axiosRequestor from '../request';

class Ticket {
    baseUrl = '/client'

    sendTicket = async (data) => {
        try {
            /*{
                email: string required,
                name: string required,
                title: string required,
                system: string required,
                file: binary,
                message: string min 5 required,
            }*/
            return await axiosRequestor.post(`${this.baseUrl}/newTicket`, data);
        } catch (error) {
            throw error;
        }
    }

}

export default new Ticket();