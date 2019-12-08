import React, { useState } from 'react';
import { Header, Container, Segment, Divider, Form, Button, Table, Comment } from 'semantic-ui-react';
import { Alert } from '../alert/alert';
import TicketRequestor from '../../services/resources/ticket';
import Router from 'next/router';
import * as moment from 'moment';
moment.locale('pt-BR')
import lodash from 'lodash';
import { loadToken } from '../../../src/lib/token';

const MessageContainer = ({ message }) => (
  <p style={{ fontSize: '1.4em' }}>
    {message}
  </p>
);

const MyTicket = (props) => {

  const [ticket, setTicket] = useState(
    props.ticket
  );

  const [input, setInput] = useState({
    message: ''
  });

  const [load, setLoad] = useState(false);

  const [alert, setAlert] = useState(null);

  const handleFildsChange = (e, { name, value }) => {
    setInput({ ...input, [name]: value });
  }

  const sendMessage = async () => {
    let check = {};

    let validateInputs = Object.keys(check).every(element => {
      return check[element] === false;
    });

    if (validateInputs) {

      setLoad(true);

      let ticketObject = {
        message: input.message,
        ticketId: ticket._id,
        name: ticket.name
      }

      await TicketRequestor.addMessage(ticketObject);

      let data = await TicketRequestor.getTicket(ticketObject.ticketId);

      if (!data.error) {
        setTicket(data.data);
      } else {
        setAlert(<Alert buttonColor="red" iconTitle="warning" iconButton="checkmark"
          message={data.error} open={true} title="Aviso" removeAlert={setAlert} />)
      }

      setLoad(false);
    }
  }

  const [checkInput, setCheckInput] = useState({ message: false });

  const { name, system, title, message, status, updatedAt, images, chat } = ticket;

  const Row = (createdAt, message, name, index, userType) => (
    <Comment key={`${message}-${index}`} >
      <Comment.Content>
        <Comment.Author as='a'>{userType === 'client' ? `Solicitante: ${name}` : `Administrador: ${name}` }</Comment.Author>
        <Comment.Metadata>
          <div>{moment(createdAt).fromNow()}</div>
        </Comment.Metadata>
        <Comment.Text>{message}</Comment.Text>
      </Comment.Content>
    </Comment>
  );

  return (
    <Container style={{ paddingBottom: "5em" }} textAlign='center'>
      {alert}
      <Header as='h1' block>
        Bem vindo ao seu ticket, <span style={{ fontWeight: 'bold' }}>{name}</span>!<br />
        você escolheu o sistema <span style={{ textDecoration: 'underline' }}>{system}</span>
      </Header>

      <Container textAlign='justified'>
        <Segment>
          <Table basic='very' celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      <Header as='h3'>
                        Solicitante:
                            </Header>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <MessageContainer message={name} />
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      <Header as='h3'>
                        Sistema:
                            </Header>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <MessageContainer message={system} />
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      <Header as='h3'>
                        Assunto do ticket:
                            </Header>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <MessageContainer message={title} />
                </Table.Cell>
              </Table.Row>

              {Array.isArray(images) && images.length !== 0
                ? <Table.Row>
                  <Table.Cell>
                    <Header as='h4' image>
                      <Header.Content>

                        <Header as='h3'>
                          Imagens do erro
                          </Header>

                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    {images ? images.map((img, i) => <a key={i} href={img} target="_blank"><MessageContainer message={`Imagem ${i + 1}`} />  </a>) : null}
                  </Table.Cell>
                </Table.Row>
                : null}

              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      <Header as='h3'>
                        Descrição:
                            </Header>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <MessageContainer message={message} />
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      <Header as='h3'>
                        Status:
                            </Header>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell positive={status === 'solved'} negative={status === 'closed'} >
                  <MessageContainer message={status} />
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      <Header as='h3'>
                        Última modificação:
                            </Header>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <MessageContainer message={moment(updatedAt).fromNow()} />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

        </Segment>

        <Comment.Group>
          {status === 'open'
            ? <>
              <Divider />
              <Form reply>
                <Form.Group>
                  <Form.Field required width={16} >
                    <Form.TextArea
                      style={{ minHeight: 200, resize: 'none' }}
                      icon="comment alternate outline"
                      iconposition="left"
                      placeholder="Digite uma mensagem..."
                      error={checkInput.message ? { content: 'Digite alguma mensagem!' } : null}
                      name='message'
                      value={input.message}
                      onChange={handleFildsChange}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
              <Button
                size='large'
                positive
                content="Enviar mensagem"
                icon="right arrow"
                labelPosition="right"
                onClick={sendMessage}
                disabled={load}
                loading={load}
              ></Button>
            </>
            : null}

          {Array.isArray(chat) && chat.length !== 0
            ? <>
              <Divider />
              <Header as='h2' dividing>
                Acompanhe as atualizações do seu ticket
              </Header>

              <Comment.Group size='huge'>
                {(lodash.sortBy(chat, (o) => o.updatedAt).reverse().map((e, i) => Row(e.createdAt, e.message, e.name, i)))}
              </Comment.Group>
            </>
            : null}


        </Comment.Group>
      </Container>
    </Container>
  );
}

export default MyTicket;