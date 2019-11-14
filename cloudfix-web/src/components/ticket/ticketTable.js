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
  Dropdown,
  Segment,
  Button,
  Input, Message
} from "semantic-ui-react";

const filterOptions = [
  {
    key: "data_abertura",
    text: "Data de Abertura",
    value: "data_abertura"
  },
  {
    key: "titulo",
    text: "Título",
    value: "titulo"
  }
];

const filterCheckedOptions = [
  {
    key: "aberto",
    text: "Aberto",
    value: "aberto"
  },
  {
    key: "respondido",
    text: "Respondido",
    value: "respondido"
  },
  {
    key: "atrasado",
    text: "Atrasado",
    value: "atrasado"
  },
  {
    key: "fechado",
    text: "Fechado",
    value: "fechado"
  }
];


  
const CheckedTicketsOptions = () => (
  <Form>
    <Form.Field inline>
      <Label pointing="right">Marcar como:</Label>
      <Dropdown
        placeholder="Escolha..."
        scrolling
        selection
        options={filterCheckedOptions}
      />
    </Form.Field>
  </Form>
)

const TicketTable = props => {
  return (
    <Grid>
      <Grid.Column mobile={16} tablet={16} computer={16}>
        <Segment.Group>
          <Segment>
            <Menu secondary>
              <Menu.Item active name="Abertos" />
              <Menu.Item name="Respondidos" />
              <Menu.Item name="Atrasados" />
              <Menu.Item name="Fechados" />
              <Menu.Menu position="right">
                <Menu.Item>
                <Input icon='search' placeholder='Search...' />
                </Menu.Item>
              </Menu.Menu>
            </Menu>
            </Segment>
            <Segment>
            
            <Divider hidden />
            <Grid.Row>
              <Table selectable striped unstackable celled compact definition>
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
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='4'>

                      <Grid.Row>
                        <Message attached='bottom'>Mostrando 1 - 2 resultados de 2.</Message>
                      </Grid.Row>

                      <Divider hidden />

                      <Grid.Row>
                        
                        {/* QUANDO ALGUM TICKET FOR SELECIONADO CheckedTicketsOptions DEVE SER MOSTRADO*/}
                      
                        <Menu floated="right" pagination>
                          <Menu.Item as="a" icon>
                            <Icon name="chevron left" />
                          </Menu.Item>
                          <Menu.Item as="a">1</Menu.Item>
                          <Menu.Item as="a">2</Menu.Item>
                          <Menu.Item as="a" icon>
                            <Icon name="chevron right" />
                          </Menu.Item>
                        </Menu>

                      </Grid.Row>   

                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer> 
                
              </Table>
            </Grid.Row>
          </Segment>
        </Segment.Group>
      </Grid.Column>
    </Grid>
  );
};

export default TicketTable;
