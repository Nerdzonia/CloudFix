import axiosRequestor from '../request';

class Ticket {
    baseUrl = '/client'

    sendTicket = async (object) => {
        try {
            /*{
                email: string required,
                name: string required,
                title: string required,
                system: string required,
                file: binary,
                message: string min 5 required,
            }*/
            const form = new FormData();
            Object.keys(object).forEach(element => {
                form.append(element, object[element]);
            });

            let { data } = await axiosRequestor.post(`${this.baseUrl}/newTicket`, form);
            console.log(data)
            return data;
        } catch (error) {
            throw error;
        }
    }

}

export default new Ticket();