import React from "react";
import {
  Label,
  Checkbox,
  Icon,
  Table,
  Menu,
  Divider,
  Grid,
  Form,
  Dropdown
} from "semantic-ui-react";

const TicketTable = props => {
  return (
    <Grid>
      <Grid.Column mobile={16} tablet={16} computer={16}>
        <Grid.Row>
          <Form>
            <Form.Field inline>
              <Label pointing="right">Filtrar tickets por:</Label><Dropdown
                icon="filter"
                iconPosition="left" placeholder='Escolha...' scrolling/>
            </Form.Field>
          </Form>
        </Grid.Row>
        <Divider hidden />
        <Grid.Row>
          <Table unstackable celled compact definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Título</Table.HeaderCell>
                <Table.HeaderCell>Data de Abertura</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing>
                  <Checkbox></Checkbox>
                </Table.Cell>
                <Table.Cell>Em aberto</Table.Cell>
                <Table.Cell>Sistema não cadastra clientes</Table.Cell>
                <Table.Cell>31/08/2019</Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="16">
                  <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron left" />
                    </Menu.Item>
                    <Menu.Item as="a">1</Menu.Item>
                    <Menu.Item as="a">2</Menu.Item>
                    <Menu.Item as="a">3</Menu.Item>
                    <Menu.Item as="a">4</Menu.Item>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron right" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default TicketTable;
