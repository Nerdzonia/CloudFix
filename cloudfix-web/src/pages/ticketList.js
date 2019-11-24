import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

import PageLayout from '../components/layout/page';
import apiRequestor from "../services/resources/ticket";
import TicketList from "../components/ticket/ticketList/ticketList";

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketList: []
        };
    }

    componentDidMount() {
        apiRequestor.getAllTickets().then(data => this.setState({ ticketList: data }))
    }

    render() {
        return (
            <PageLayout>
                {!!this.state.ticketList.data 
                ? <TicketList ticketList={this.state.ticketList.data} load={!!this.state.ticketList.data} /> 
                : <Dimmer active inverted>
                    <Loader size="big" disabled={this.state.ticketList.data}>Carregando</Loader>
                </Dimmer>}
            </PageLayout>
        );
    }
}

export default Index;