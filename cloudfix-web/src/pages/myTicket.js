import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router'

import PageLayout from '../components/layout/page'
import { Alert } from '../components/alert/alert';
import TicketRequestor from '../services/resources/ticket';


const MyTicket = (props) => {
    const { query: { id } } = useRouter();

    const [ticket, setTicket] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (id) {
            (async () => {
                let data = await TicketRequestor.getTicket(id);
                if (!data.error)
                    setTicket(data);
                else
                    setAlert(<Alert buttonColor='red' iconButton='checkmark' iconTitle='warning' message={data.error} open={true} title='Erro'  removeAlert={setAlert} />)
            })();
        } else {
            Router.push('/');
        }
    }, [])

    return (
        <PageLayout>
            {/* {console.log(ticket)} */}
            {alert}
        </PageLayout>
    );
}

export default MyTicket;