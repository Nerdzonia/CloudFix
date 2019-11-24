import React from 'react';

import PageLayout from '../components/layout/page';
import TicketForm from "../components/ticket/ticketForm/ticketForm";

class Index extends React.Component {

    render() {
        return (
            <PageLayout>
                <TicketForm />
            </PageLayout>
        );
    }
}

export default Index;