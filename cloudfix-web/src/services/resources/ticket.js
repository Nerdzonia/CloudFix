import axiosRequestor from '../request';

class Ticket {
    baseUrl = '/ticket'

    getTicket = async (id) => {
        try {
            let { data } = await axiosRequestor.get(`${this.baseUrl}/show/${id}`);
            return data;
        } catch (err) {   
            return err.response.data;
        }
    }

    //listar todos os tickets
    getAllTickets = async () => {
        try {
            let { data } = await axiosRequestor.get(`${this.baseUrl}/listAll`);
            return data;
        } catch (err) {   
            return err.response.data;
        }
    }

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
                if (element === 'image')
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
        } catch (err) {
            return err.response.data;
        }
    }

}

export default new Ticket();