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
                if(element === 'image')
                    object[element].map(file => form.append('file', file));
                else
                    form.append(element, object[element]);
            });
            
            let { data } = await axiosRequestor.post(`${this.baseUrl}/newTicket`, form, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            });
            
            return data;
        } catch (error) {
            throw error;
        }
    }

}

export default new Ticket();