import Link from "next/link";
import { Grid, Image, Icon, Header } from "semantic-ui-react";

import logo from "../../../../assets/images/cloudfix.png";

const HeaderC = props => {
  return (
    <Grid centered stackable columns={3} >
          <Grid.Column only="computer" width={4} />

          <Grid.Column width={8}>
            <Link href="/">
              <a><Image centered src={logo} width="200px" /></a>
            </Link>
          </Grid.Column>

          <Grid.Column width={4} verticalAlign="middle">
              <Header as="h5">
                <Icon name="settings" />
                <Header.Content>
                  <Link href="/admin"><a>Admin area</a></Link>
                </Header.Content>
              </Header>
          </Grid.Column>
    </Grid>
  );
};

export default HeaderC;
