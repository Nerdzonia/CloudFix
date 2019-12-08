import React, { useState, Popup, useEffect } from "react";
import Router from 'next/router';
import Link from "next/link";
import lodash from 'lodash';
import { Icon, Table, Menu, Divider, Grid, Form, Segment, Button, Input, Breadcrumb, Header, Pagination } from "semantic-ui-react";
import { DateRange } from 'react-date-range';
import * as rdrLocales from "react-date-range/dist/locale";
import * as moment from 'moment';
moment.locale('pt-BR')
import ticketRequestor from '../../../services/resources/ticket';
import SystemSelect from '../../utils/SystemSelect';

const statusSearch = [
  {
    key: "aberto",
    text: "Aberto",
    value: "open"
  },
  {
    key: "respondido",
    text: "Respondido",
    value: "solved"
  },
  {
    key: "fechado",
    text: "Fechado",
    value: "closed"
  }
];

const TicketList = (props) => {
  const {
    ticketList
  } = props;

  const [isActive, setActive] = useState(false);

  const [sort, setSort] = useState({
    column: null,
    data: ticketList.docs,
    direction: null,
  });

  const [query, setQuery] = useState({});
  const [paginateTicket, setPaginateTicket] = useState({});
  const [paginateInfo, setPaginateInfo] = useState(ticketList);
  const [inputs, setInputs] = useState({});

  const handleSort = async (clickedColumn) => {
    const { column, direction } = sort;
    let paginateRule = {};

    if (column !== clickedColumn) {
      paginateRule = {
        pagination: { ...paginateTicket, sort: 'asc', column: clickedColumn }
      }
      await ticketRequestor.getAllTickets({ ...paginateRule, query }).then(ticket => {
        setSort({
          column: clickedColumn,
          data: ticket.data.docs || [],
          direction: 'ascending',
        });
      });
      setPaginateTicket({
        ...paginateTicket,
        ...paginateRule.pagination
      });
      return
    }

    paginateRule = {
      pagination: {
        ...paginateTicket,
        sort: paginateTicket.sort === 'asc' ? 'desc' : 'asc',
        column: clickedColumn
      }
    }

    setPaginateTicket({
      ...paginateTicket,
      ...paginateRule.pagination
    });

    await ticketRequestor.getAllTickets({ ...paginateRule, query }).then(ticket => {
      setSort({
        ...sort,
        data: ticket.data.docs || [],
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      });
    });
  }

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (date) => {
    setSelectionRange({
      ...selectionRange,
      ...date.selection
    })
    setInputs({
      ...inputs,
      startAt: new Date(date.selection.startDate).toISOString(),
      endsAt: new Date(date.selection.endDate).toISOString()
    })
  }

  const paginate = async (info) => {
    let pagination = {
      ...paginateTicket,
      page: info.activePage,
    }
    setPaginateTicket({
      ...paginateTicket,
      ...pagination
    });

    await ticketRequestor.getAllTickets({ pagination, query }).then(ticket => {
      if (ticket.data) {
        setSort({
          ...sort,
          data: ticket.data.docs
        });
        setPaginateInfo({
          ...ticket.data
        });
      } else {
        console.error(ticket.error)
      }
    });
  } 

  const handleInputs = ({ name, value }, e) => {
    setInputs({ ...inputs, [name]: value });
  }

  const handleSendQuery = async () => {
    let newQuery = {};
    Object.keys(inputs).map(e => inputs[e] !== "" ? newQuery[e] = inputs[e] : null);
    setQuery({ ...newQuery })
    await ticketRequestor.getAllTickets({ query: { ...newQuery } }).then(ticket => {
      setSort({
        column: null,
        data: ticket.data.docs || [],
        direction: null,
      });
      setPaginateInfo(ticket.data);
    })
  }

  const handleClenInputs = () => {
    let fields = {}
    Object.keys(inputs).map(e => fields[e] = "");
    setSelectionRange({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    })
    setInputs({ ...fields })
  }

  const updateTicketStatus = async (id, status) => {
    await ticketRequestor.updateStatus(id, status);
    await ticketRequestor.getAllTickets({ pagination: {...paginateTicket}, query}).then(ticket => {
      setSort({
        ...sort,
        data: ticket.data.docs || []
      })
    });
  }

  const Row = (id, status, system, title, updatedAt, index) => (
    <Table.Row key={`${title}-${index}`} positive={status === 'solved'} negative={status === 'closed'} >
      <Table.Cell>{status === "open" ? "Aberto" : status === "solved" ? "Resolvido" : status === "closed" ? "Fechado" : null}</Table.Cell>
      <Table.Cell>{system}</Table.Cell>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>{moment(updatedAt).fromNow()}</Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Button basic icon='check circle' color='green' onClick={() => updateTicketStatus(id, 'solved')} disabled={status === 'solved'} /> 
          <Button basic icon='external square alternate' color='blue' onClick={() => Router.push({
            pathname: '/myTicket',
            query: { id: id },
          })} />
          <Button icon='stop circle' color='red' onClick={() => updateTicketStatus(id, 'closed')} disabled={status ==='closed'} />
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );

  const { column, direction, data } = sort
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
                        <Button compact icon labelPosition='right' onClick={() => setActive(!isActive)}>
                          Busca Avançada
                          <Icon name='search' />
                        </Button>
                      </Menu.Item>
                      {isActive
                        ? <>
                          <Menu.Item>
                            <Button compact color="green" icon labelPosition='right' onClick={handleSendQuery}>
                              Buscar
                          <Icon name='search plus' />
                            </Button>
                          </Menu.Item>
                          <Menu.Item>
                            <Button compact color="red" icon labelPosition='right' onClick={handleClenInputs}>
                              Limpar
                          <Icon name='eraser' />
                            </Button>
                          </Menu.Item>
                        </>
                        : null}
                    </Menu.Menu>
                  </Menu>
                </Segment>

                {/* BUSCA AVANÇADA */}
                {isActive
                  ? <Segment>
                    <Form>
                      <Form.Group widths='equal'>
                        <Form.Select options={statusSearch} name="status" fluid label='Status:' onChange={(e, d) => handleInputs(d)} value={inputs.status || ''} placeholder='Aberto' />
                        <Form.Input fluid label='Cliente:' value={inputs.name || ''} name="name" placeholder='Evillyn' onChange={(e, d) => handleInputs(d)} />
                        <SystemSelect placeholder="selecione o sistema" value={inputs.system || ''} label="Sistema:" name="system" onChange={(e, d) => handleInputs(d)} />
                      </Form.Group>
                      <Form.Group widths="equal">
                        <DateRange
                          locale={rdrLocales.pt}
                          ranges={[selectionRange]}
                          onChange={handleSelect}
                        />
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
                            onClick={() => handleSort('title')}>TÍTULO</Table.HeaderCell>
                          <Table.HeaderCell sorted={column === 'updatedAt' ? direction : null}
                            onClick={() => handleSort('updatedAt')}>ULTIMA VEZ MODIFICADO</Table.HeaderCell>
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
                            <Divider hidden />
                            <Grid.Row>

                              <Menu floated="right">
                                <Pagination
                                  defaultActivePage={1}
                                  firstItem={null}
                                  lastItem={null}
                                  siblingRange={1}
                                  totalPages={paginateInfo.totalPages}
                                  onPageChange={(mouseEvent, data) => paginate(data)}
                                />
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
