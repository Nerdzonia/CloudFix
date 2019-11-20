import React from 'react';
import PageLayout from '../components/layout/page';
import apiRequestor from "../services/resources/ticket";
import TicketList from "../components/ticket/ticketList/ticketList";
import TicketForm from "../components/ticket/ticketForm/ticketForm";

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketList: []};
    }

    componentDidMount(){
        apiRequestor.getAllTickets().then(data => this.setState({ticketList: data}))
    }

    render() {
        return (
            <PageLayout>
                {console.log(this.state.ticketList)}
                <TicketList />
            </PageLayout>
        );
    }
}

export default Index;