import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import PageLayout from '../components/layout/page';

const Ticket = (props) => {
    const [ticketLink, setTicketLink] = useState('');

    useEffect(()=>{
        if(sessionStorage.getItem("ticket"))
            setTicketLink(sessionStorage.getItem("ticket"));
        else
            Router.push('/');
    }, [])
    return (
        <PageLayout>
            <h3><a href={`${ticketLink}`}>Uma copia do link foi enviada para o seu email.</a></h3>
        </PageLayout>
    )

}

export default Ticket;