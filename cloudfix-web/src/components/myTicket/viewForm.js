import React, { useState } from 'react';
import { Header, Container, Segment, Divider, Form, Grid, Button, Table, Comment } from 'semantic-ui-react';
import { Alert } from '../alert/alert';
import TicketRequestor from '../../services/resources/ticket';
import Router from 'next/router';
import * as moment from 'moment';
moment.locale('pt-BR')
import lodash from 'lodash';

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

      let data = await TicketRequestor.addMessage(ticketObject);

      setTicket(data);

      data = await TicketRequestor.getTicket(ticketObject.ticketId);

      console.log(data);
      
        if (!data.error) {
          Router.push(`/myTicket?id=${data.id}`, '/ticket');
        } else {
          setAlert(<Alert buttonColor="red" iconTitle="warning" iconButton="checkmark" 
          message={data.error} open={true} title="Aviso" removeAlert={setAlert} />)
        }
        
      setLoad(false);
      }
    }

    const [checkInput, setCheckInput] = useState({ message: false });

    const { name, system, title, message, status, updatedAt, images, chat } = ticket;
    
     const Row = (createdAt, message, name, index) => ( 
    <Comment key={`${message}-${index}`} >
      <Comment.Avatar content='{{ name.charAt(0) }}'/>
      <Comment.Content>
        <Comment.Author as='a'>{name}</Comment.Author>
        <Comment.Metadata>
          <div>{moment(createdAt).fromNow()}</div>
        </Comment.Metadata>
        <Comment.Text>{message}</Comment.Text>
      </Comment.Content>
    </Comment>
   );
  
    return (
        <Container style={{ paddingBottom: "5em" }} textAlign='center'>
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

                    {/*
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h4' image>
                          <Header.Content>
                          { images
                          ? <Header as='h3'>
                              Imagens do erro
                          </Header>
                          : null}
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        {images ? images.map((img, i) => <a key={i} href={img} target="_blank"><MessageContainer message={`Imagem ${i+1}`} />  </a>) : null}
                      </Table.Cell>
                    </Table.Row>
                    */}

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
                <Divider/>

                          <Comment.Group>
                            <Header as='h2' dividing>
                            Acompanhe as atualizações do seu ticket
                            </Header>

                            <Comment.Group size='huge'>
                              {lodash.map(chat, (e, i) => Row(e.createdAt, e.message, e.name, i))}
                            </Comment.Group>
                            
                            <Divider/>

                              <Form reply>
                                <Form.Group>
                                  <Form.Field required width={16} >
                                    <Form.TextArea
                                      style={{ minHeight: 200 }}
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
                                positive
                                content="Enviar mensagem"
                                icon="check"
                                labelPosition="right"
                                onClick={sendMessage}
                                disabled={load}
                                loading={load}
                              ></Button>
                          </Comment.Group>                            
              </Container>
        </Container>
    );
}

export default MyTicket;