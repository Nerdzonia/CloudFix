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
  Input, 
  Message,
  Breadcrumb,
  Header
} from "semantic-ui-react";
import Link from "next/link";

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

const advancedSearch = [
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
        options={advancedSearch}
      />
    </Form.Field>
  </Form>
)

const TicketList = (props) => {
  const {
      ticketList
  } = props.ticketList;

  console.log(props.ticketList);
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
          </Header>
          <Divider/>
        </Grid.Row>

        <Grid.Row>
          
    <Grid>
      <Grid.Column mobile={16} tablet={16} computer={16}>
        <Segment.Group>
          <Segment>
            <Menu secondary>
              <Menu.Menu position="left">
                <Menu.Item>
                <Input icon='search' placeholder='Buscar campo...' />
                </Menu.Item>
                <Menu.Item>
                  <Button compact icon labelPosition='right'>
                    Busca Avançada
                    <Icon name='search' />
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>


            <Form>
    <Form.Field inline>
      <Label pointing="right">Marcar como:</Label>
      <Dropdown
        placeholder="Escolha..."
        scrolling
        selection
        options={advancedSearch}
      />
    </Form.Field>
  </Form>

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
                    <Table.HeaderCell>Opções</Table.HeaderCell>
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
                    <Table.Cell>

                    <Button.Group>
                      <Button basic icon='check circle' color='green'/>
                      <Button basic icon='external square alternate' color='blue'/>
                      <Button icon='stop circle' color='red'/>
                    </Button.Group>
                    </Table.Cell>
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
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default TicketList;
