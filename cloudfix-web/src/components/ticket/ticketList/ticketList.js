import { Grid, Header, Divider, Breadcrumb, Menu, Input } from "semantic-ui-react";

import TicketTable from "../ticketTable.js";
import Link from "next/link";

const TicketList = props => {
  return (
    <Grid container centered columns={1}>
      <Grid.Column mobile={16} tablet={10} computer={12}>
        <Grid.Row>
          <Breadcrumb>
            <Link href="/">
              <Breadcrumb.Section link>Home </Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section active>Tickets</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Row>

        <Grid.Row>
          <Header as="h1" textAlign="center">
            Tickets
          </Header>
          <Divider/>
        </Grid.Row>

        <Grid.Row>
          <TicketTable />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default TicketList;
