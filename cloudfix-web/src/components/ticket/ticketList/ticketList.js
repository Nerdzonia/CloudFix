import {
    Grid,
    Header,
    Divider,
    Input,
    Form,
    TextArea,
    Breadcrumb,
    Button
} from "semantic-ui-react";

import TicketTable from "../ticketTable.js"

const TicketList = props => {
    return (
        <Grid container centered columns={1}>
      <Grid.Column mobile={16} tablet={10} computer={12}>
        <Grid.Row>
          <Breadcrumb>
            <Breadcrumb.Section link>
              Home
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section link active>
              Tickets
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Row>

        <Grid.Row>
          <Header as="h1" textAlign="center">
            Tickets
          </Header>
          <Divider />
        </Grid.Row>

        <Grid.Row>
            <TicketTable></TicketTable>
        </Grid.Row>

      </Grid.Column>
    </Grid>
    );
};


export default TicketList;