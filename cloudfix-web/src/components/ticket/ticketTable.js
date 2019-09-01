import React from 'react'
import { Button, Checkbox, Icon, Table, Menu, Label } from 'semantic-ui-react'

const TicketTable = props => {
    return (
        <Table celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell/>
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
    
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='16'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
        );
    };

export default TicketTable;