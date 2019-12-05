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
    getAllTickets = async (criteria = {}) => {
        try {
            console.log(criteria)
            let { data } = await axiosRequestor.post(`${this.baseUrl}/searcByCriteria`, criteria); 
            return data;
        } catch (err) {   
            return err.response.data;
        }
    }

    sendTicket = async (object) => {
        try {
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

    addMessage = async (object) => {
        try {
            let { data } = await axiosRequestor.post(`${this.baseUrl}/addMessage`, object);

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    updateStatus = async (id, status) => {
        try{
            console.log(id, status)
            let { data } = await axiosRequestor.post(`${this.baseUrl}/updateStatus`, {id, status});
            return data;
        }catch(err) {
            return err.response.data
        }
    }

}

export default new Ticket();