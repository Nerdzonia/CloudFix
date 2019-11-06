import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

import PageLayout from '../components/layout/page';
import TicketCard from '../components/ticket/card';

const Load = () => (
    <Segment>
        <Dimmer>
            <Loader size='large'>Carregando</Loader>
        </Dimmer>
    </Segment>
)

const Ticket = () => {
    const { query: { id } } = useRouter();

    useEffect(() => {
        if (!id)
            Router.push('/')
    }, [])

    return (
        <PageLayout>
            {id ? <TicketCard id={id} /> : <Load />}
        </PageLayout>
    )

}

export default Ticket;