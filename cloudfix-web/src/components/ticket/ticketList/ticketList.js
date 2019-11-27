import lodash from 'lodash';
import React, { useState } from "react";
import {
  Label,
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
  Breadcrumb,
  Header
} from "semantic-ui-react";
import * as moment from 'moment';
import Link from "next/link";

moment.locale('pt-BR')

// const filterOptions = [
//   {
//     key: "data_abertura",
//     text: "Data de Abertura",
//     value: "data_abertura"
//   },
//   {
//     key: "titulo",
//     text: "Título",
//     value: "titulo"
//   }
// ];

// const CheckedTicketsOptions = () => (
//   <Form>
//     <Form.Field inline>
//       <Label pointing="right">Marcar como:</Label>
//       <Dropdown
//         placeholder="Escolha..."
//         scrolling
//         selection
//         options={advancedSearch}
//       />
//     </Form.Field>
//   </Form>
// )

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


const Row = (status, system, title, updatedAt, index) => (
  <Table.Row key={`${title}-${index}`}>
    <Table.Cell>{status}</Table.Cell>
    <Table.Cell>{system}</Table.Cell>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell>{moment(updatedAt).fromNow()}</Table.Cell>
    <Table.Cell>

      <Button.Group>
        <Button basic icon='check circle' color='green' />
        <Button basic icon='external square alternate' color='blue' />
        <Button icon='stop circle' color='red' />
      </Button.Group>
    </Table.Cell>
  </Table.Row>
);

const TicketList = (props) => {

  const {
    ticketList
  } = props;

  const [isActive, setActive] = useState(false);
  
  const [sort, setSort] = useState({
    column: null,
    data: ticketList,
    direction: null,
  });

  const handleSort = (clickedColumn) => () => {
    const { column, data, direction } = sort;
    
    if (column !== clickedColumn) {
      setSort({
        column: clickedColumn,
        data: lodash.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });

      return
    }

    setSort({
      ...sort,
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }
  console.log(ticketList)
  const { column, direction, data } = sort;
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
          <Divider />
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
                        <Button compact icon labelPosition='right' onClick={() => setActive(!isActive)}>
                          Busca Avançada
                          <Icon name='search' />
                        </Button>
                      </Menu.Item>
                      <Menu.Item>
                        <Form>
                          <Form.Field inline>
                            <Dropdown
                              placeholder="Escolha..."
                              scrolling
                              selection
                              options={advancedSearch}
                            />
                            <Label pointing="left">Marcar como:</Label>
                          </Form.Field>
                        </Form>
                      </Menu.Item>
                    </Menu.Menu>
                  </Menu>
                </Segment>

                {isActive 
                ? <Segment>
                  <Menu secondary>
                    <Menu.Item>
                      <Header>Bakanayaro Konoyaro</Header>
                    </Menu.Item>
                  </Menu>
                </Segment> : null}

                <Segment>
                  <Divider hidden />
                  <Grid.Row>

                    <Table sortable selectable striped unstackable celled compact textAlign="center" >
                      <Table.Header >
                        <Table.Row>
                          <Table.HeaderCell>STATUS</Table.HeaderCell>
                          <Table.HeaderCell>SISTEMA</Table.HeaderCell>
                          <Table.HeaderCell sorted={column === 'title' ? direction : null}
                            onClick={handleSort('title')}>TÍTULO</Table.HeaderCell>
                          <Table.HeaderCell sorted={column === 'updatedAt' ? direction : null}
                            onClick={handleSort('updatedAt')}>ULTIMA VEZ MODIFICADO</Table.HeaderCell>
                          <Table.HeaderCell>OPÇÕES</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {lodash.map(data, (e, i) => Row(e.status, e.system, e.title, e.updatedAt, i))}
                      </Table.Body>

                      <Table.Footer fullWidth>
                        <Table.Row>
                          <Table.HeaderCell />
                          <Table.HeaderCell colSpan='4'>

                            {/* <Grid.Row>
                              <Message attached='bottom'>Mostrando 1 - 2 resultados de 2.</Message>
                            </Grid.Row> */}

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
