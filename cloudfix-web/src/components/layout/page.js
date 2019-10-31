import { Container, Grid } from "semantic-ui-react";

import HeaderC from "../shared-components/header/header";

const Page = props => (
  <Container>
    <Grid centered >
      <Grid.Row>
        <HeaderC />
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column>
          {props.children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default Page;
