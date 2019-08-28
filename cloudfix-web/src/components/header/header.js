import { Grid, Image, Icon, Header } from "semantic-ui-react";

import logo from "../../../assets/images/cloudfix.png";
import Link from "next/link";

const HeaderC = props => {
  return (
    <Grid stackable columns={3}>
    
      <Grid.Column only="computer" width={4}></Grid.Column>

      <Grid.Column width={8}>
        <Image centered src={logo} width="200px" />
      </Grid.Column>

      <Grid.Column width={4} verticalAlign='middle' >

        <Header as="h5">
          <Icon name="settings" />
          <Header.Content>
            <Link to="#">Admin area</Link>
          </Header.Content>
        </Header>
      </Grid.Column>

    </Grid>
  );
};

export default HeaderC;
