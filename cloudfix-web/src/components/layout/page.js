import { Container, Grid } from "semantic-ui-react";

import HeaderC from "../shared-components/header/header";
import Footer from "../shared-components/footer/footer";

const Page = props => (
  <Container>
    <Grid centered >
      <Grid.Row>
        <HeaderC />
      </Grid.Row>
    </Grid>
    {props.children}
    <Footer anything={"Footer"} />
  </Container>
);

export default Page;
