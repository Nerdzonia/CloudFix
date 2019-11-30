import React from 'react';
import Router from 'next/router';
import { Loader, Dimmer } from 'semantic-ui-react';

import { checkToken, renewToken, removeToken, loadToken } from '../lib/token';
import { redirect } from '../lib/auth';
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

    static async getInitialProps(ctx) {
        if (checkToken(ctx, 'token'))
            renewToken('token', ctx, 30);
        else
            redirect(ctx, '/admin');
    }
    
    // shouldComponentUpdate(nextProps, nextState){
    //     if (loadToken('token'))
    //         renewToken('token', {}, 30);
    //     else
    //         Router.push('/admin');

    //     return nextProps;
    // }

    componentDidMount() {
        apiRequestor.getAllTickets().then(
            data => {
                if (!data.error) {
                    this.setState({ ticketList: data });
                } else {
                    Router.push('/admin');
                    removeToken('token');
                }
            }
        );
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