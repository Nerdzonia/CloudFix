import React, { Component } from "react";
import Router from 'next/router';
import { Menu } from "semantic-ui-react";

import logo from "../../../../assets/images/cloudfix.png";

export default class MenuExampleStackable extends Component {
    state = {};

    // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return ( <
            Menu stackable >
            <
            Menu.Item >
            <
            img src = { logo }
            /> <
            /Menu.Item>

            <
            Menu.Item name = "features"
            active = { activeItem === "features" }
            // onClick={this.handleItemClick}
            onClick = {
                () => Router.push('/') } >
            Solicitar Ticket <
            /Menu.Item>

            <
            Menu.Item name = "testimonials"
            active = { activeItem === "testimonials" }
            // onClick={this.handleItemClick}
            onClick = {
                () => Router.push('/admin') } >
            Acompanhar Tickets <
            /Menu.Item> <
            /Menu>
        );
    }
}