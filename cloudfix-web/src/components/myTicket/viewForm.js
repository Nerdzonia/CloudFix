import React, { useState } from 'react';
import { Header, Container, Segment, Divider, Form, Grid, Button } from 'semantic-ui-react';
import TicketRequestor from '../../services/resources/ticket';

import * as moment from 'moment';
moment.locale('pt-BR')

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
      console.log(data);

      setTicket(data);

        if (!data.error) {
          Router.push(`/ticket?id=${data.id}`, '/ticket');
        } else {
          setAlert(<Alert buttonColor="red" iconTitle="warning" iconButton="checkmark" message={data.error} open={true} title="Aviso" removeAlert={setAlert} />)
        }
        
        setLoad(false);
      }
    }

    const [checkInput, setCheckInput] = useState({
        message: false
    });

    

    const {
        name,
        _id,
        system,
        title,
        message,
        status,
        updatedAt,
        images,
        chat
    } = ticket;
  
    return (
        <Container style={{ paddingBottom: "5em" }} textAlign='center'>
            <Header as='h1' block>
                Bem vindo ao seu ticket <span style={{ fontWeight: 'bold' }}>{name}</span><br />
                você escolheu o sistema <span style={{ textDecoration: 'underline' }}>{system}</span>
            </Header>

            <Container textAlign='justified'>
                <Segment>
                    <Header as='h3'>
                        Assunto:
                    </Header>
                    <MessageContainer message={title} />
                    { images.length !== 0
                    ? <Header as='h3'>
                        Imagens do erro
                    </Header>
                    : null}
                    {images ? images.map((img, i) => <a key={i} href={img} target="_blank"><MessageContainer message={`Imagem ${i+1}`} />  </a>) : null}
                    <Header as='h3'>
                        Mensagem:
                    </Header>
                    <MessageContainer message={message} />
                    <Header as='h3'>
                        Id:
                    </Header>
                    <MessageContainer message={_id} />
                    <Header as='h3'>
                        Status:
                    </Header>
                    <MessageContainer message={status} />
                    <Header as='h3'>
                        Última modificação:
                    </Header>
                    <MessageContainer message={moment(updatedAt).fromNow()} />
                </Segment>
                <Divider/>
                <Segment>
                    <Header as="h3">Chat:</Header>
                      <Grid.Row>
                        <Grid.Column>
                          <Form>
                            <Form.Group>
                              <Form.Field required width={11} >
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
                          </Grid.Column>
                          <Grid.Column>
                            <Button
                              positive
                              content="Enviar mensagem"
                              icon="check"
                              labelPosition="right"
                              onClick={sendMessage}
                              // disabled={load}
                              // loading={load}
                            ></Button>
                        </Grid.Column>
                      </Grid.Row>
                </Segment>
            </Container>
            {/* <br/>
            <Container textAlign='justified'>
                <Segment>
                <Header as='h2'>Chat com o suporte</Header>
            
                </Segment>
            </Container> */}
        </Container>
    );
}

export default MyTicket;