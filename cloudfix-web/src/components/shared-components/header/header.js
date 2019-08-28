import { Grid, Image, Icon, Header, Menu, Segment } from "semantic-ui-react";

import logo from "../../../../assets/images/cloudfix.png";
import Link from "next/link";

import MenuExampleStackable from "../../shared-components/menu/menu.js"; 

const HeaderC = props => {
  return (
    <Grid>
      <Grid.Row>
        <Grid stackable columns={3}>
          <Grid.Column only="computer" width={4}></Grid.Column>

          <Grid.Column width={8}>
            <Image centered src={logo} width="175px" />
          </Grid.Column>

          <Grid.Column width={4} verticalAlign="middle">
            <Header as="h5">
              <Icon name="settings" />
              <Header.Content>
                <Link to="#">Admin area</Link>
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid>
      </Grid.Row>
      <Grid.Row>
      <MenuExampleStackable></MenuExampleStackable>
        
      </Grid.Row>

    </Grid>
  );
};

export default HeaderC;
