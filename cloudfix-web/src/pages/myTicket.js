import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router'
import { Loader } from 'semantic-ui-react';

import PageLayout from '../components/layout/page'
import { Alert } from '../components/alert/alert';
import TicketRequestor from '../services/resources/ticket';
import TicketView from '../components/myTicket/viewForm';

const MyTicket = (props) => {
    const { query: { id } } = useRouter();

    const [ticket, setTicket] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (id) {
            (async () => {
                let data = await TicketRequestor.getTicket(id);
    
                if (!data.error){
                    setTicket(data.data);
                }
                else{
                    setAlert(<Alert buttonColor='red' iconButton='checkmark' iconTitle='warning' message={`${data.error}. Redirecionando para home em 5 segundos.`} open={true} title='Erro'  removeAlert={setAlert} />)
                    setTimeout(() => Router.push('/'), 5000);
                }
            })();
        } else {
            Router.push('/');
        }
    }, [])

    return (
        <PageLayout>
            {ticket ? <TicketView ticket={ticket} /> : <Loader active inline='centered' />}
            {alert}
        </PageLayout>

    );
}

export default MyTicket;