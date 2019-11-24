import React from 'react';
import { Header } from 'semantic-ui-react';

import PageLayout from '../components/layout/page';
import apiRequestor from "../services/resources/ticket";
import TicketList from "../components/ticket/ticketList/ticketList";
// import TicketForm from "../components/ticket/ticketForm/ticketForm";

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketList: []
        };
    }

    componentDidMount(){
        apiRequestor.getAllTickets().then(data => this.setState({ticketList: data}))
    }

    render() {
        return (
            <PageLayout>
                {!!this.state.ticketList.data ? <TicketList ticketList={this.state.ticketList.data} load={!!this.state.ticketList.data} /> : <Header textAlign="center">Carregando</Header>}
            </PageLayout>
        );
    }
}

export default Index;