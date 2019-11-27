import lodash from 'lodash';
import React, { useState, useEffect } from "react";
import Router from 'next/router';
import SystemRequestor from '../../../services/resources/system';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
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

const statusSearch = [
  {
    key: "aberto",
    text: "Aberto",
    value: "open"
  },
  {
    key: "respondido",
    text: "Respondido",
    value: "answered"
  },
  {
    key: "atrasado",
    text: "Atrasado",
    value: "late"
  },
  {
    key: "fechado",
    text: "Fechado",
    value: "closed"
  }
];

const Row = (id, status, system, title, updatedAt, index) => (
  <Table.Row key={`${title}-${index}`}>
    <Table.Cell>{status}</Table.Cell>
    <Table.Cell>{system}</Table.Cell>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell>{moment(updatedAt).fromNow()}</Table.Cell>
    <Table.Cell>
    
      <Button.Group>
        <Button basic icon='check circle' color='green' />
        <Button basic icon='external square alternate' color='blue' onClick={() => Router.push({
          pathname: '/myTicket',
          query: { id: id },
        })} />
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
  const { column, direction, data } = sort;

  const [system, setSystem] = useState({load: false, system: null});

  const formatInDropdawnArray = (system) => {
    return system.map(e => ({key: e.name, value: e.name, text: e.name}));
  }

  useEffect(() => {
    SystemRequestor.listAllSystems().then(data => setSystem({load: true, system: data}));
  }, []);

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  return (
    <Grid container centered columns={1}>
      <Grid.Column mobile={16} tablet={10} computer={16}>
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
                          <Form.Select options={statusSearch} inline label='Marcar como:' placeholder='Aberto' />
                        </Form>
                      </Menu.Item>
                    </Menu.Menu>
                  </Menu>
                </Segment>

                {/* BUSCA AVANÇADA */}
                {isActive
                  ? <Segment>
                    <Form>
                        <Form.Group widths='equal'>
                          <Form.Select options={statusSearch} fluid label='Status:' placeholder='Aberto' />
                          
                          {/*trazer select com nome de clientes */}
                          <Form.Input fluid label='Cliente:' placeholder='Evillyn' />
                          <Form.Select
                            loading={!system.load}
                            fluid
                            label={'Sistema:'}
                            placeholder="Ex: Selecione o sistema"
                            options={system.load ? formatInDropdawnArray(system.system.data) : []}
                            name='system'
                          />
                      </Form.Group>
                      <Form.Group widths="equal">
                      <DateRangePicker/>
                      </Form.Group>
                    </Form>
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
                        {lodash.map(data, (e, i) => Row(e._id, e.status, e.system, e.title, e.updatedAt, i))}
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
