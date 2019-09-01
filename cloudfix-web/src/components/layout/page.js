import { Container, Grid } from "semantic-ui-react";

import HeaderC from "../shared-components/header/header";
import Footer from "../shared-components/footer/footer";
import TicketList from "../ticket/ticketList/ticketList";

const Page = props => (
  <Container>
    <Grid centered >
      <Grid.Row>
        <HeaderC />
      </Grid.Row>
    </Grid>
    <TicketList></TicketList>
    {/*props.children*/}
    <Footer anything={"Footer"} />
  </Container>
);

export default Page;
