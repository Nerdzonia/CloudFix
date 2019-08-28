import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";

import logo from "../../../../assets/images/cloudfix.png";

export default class MenuExampleStackable extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu stackable>
        <Menu.Item>
          <Link to="#">
            <img src={logo} />
          </Link>
        </Menu.Item>

        <Menu.Item
          name="features"
          active={activeItem === "features"}
          onClick={this.handleItemClick}
        >
          Solicitar Ticket
        </Menu.Item>

        <Menu.Item
          name="testimonials"
          active={activeItem === "testimonials"}
          onClick={this.handleItemClick}
        >
          Acompanhar Tickets
        </Menu.Item>
      </Menu>
    );
  }
}
