import React, { Component } from "react";
import Router from 'next/router';
import { Menu } from "semantic-ui-react";

import logo from "../../../../assets/images/cloudfix.png";

export default class MenuExampleStackable extends Component {
    state = {
        activeItem: ''
    };

    handleItemClick = (e, { name }) => {
        if(name === 'home')
            Router.push('/')
        else if (name === 'tickets')
            Router.push('/admin')
        this.setState({ activeItem: name })
    };

    render() {
        const { activeItem } = this.state;

        return (
            <Menu stackable >
                <Menu.Item onClick={() => Router.push('/')} >
                    <img src={logo} />
                </Menu.Item>

                <Menu.Item name="home"
                    active={activeItem === "home"}
                    onClick={this.handleItemClick.bind(this)}>
                    Solicitar Ticket
                </Menu.Item>

                <Menu.Item name="tickets"
                    active={activeItem === "tickets"}
                    onClick={this.handleItemClick.bind(this)}>
                    Acompanhar Ticket
                </Menu.Item>
            </Menu>
        );
    }
}