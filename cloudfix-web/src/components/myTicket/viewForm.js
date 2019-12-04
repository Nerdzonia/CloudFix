import React, { useState } from 'react';
import { Header, Container, Segment, Divider, Form, Grid, Button } from 'semantic-ui-react';

const MessageContainer = ({ message }) => (
    <p style={{ fontSize: '1.4em' }}>
        {message}
    </p>
);


const sendMessage = async () => {
  let check = {};
  
  let validateInputs = Object.keys(check).every(element => {
    return check[element] === false;
  });
  
  if (validateInputs) {
    setLoad(true);
    
    let data = await TicketRequestor.addMensage(input);
    
      if (!data.error) {
        Router.push(`/ticket?id=${data.id}`, '/ticket');
      } else {
        setAlert(<Alert buttonColor="red" iconTitle="warning" iconButton="checkmark" message={data.error} open={true} title="Aviso" removeAlert={setAlert} />)
      }
      
      setLoad(false);
    }
  }
  
  const MyTicket = (props) => {

    const [input, setInput] = useState({
        message: ''
    });
      
    const [checkInput, setCheckInput] = useState({
        message: false
    });

    const {
        name,
        system,
        title,
        message,
        images,
        chat
    } = props.ticket;
    console.log(chat)
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
                </Segment>
                <Divider/>
                <Segment>
                    <Header>Chat:</Header>
                    <Grid.Column>
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
                          // onChange={handleFildsChange}
                        />
                      </Form.Field>
                    </Form.Group>
                  </Grid.Column>
                  <Grid.Column>
                    <Button.Group floated="right">
                      <Button>Cancelar</Button>
                      <Button.Or text="ou" />
                      <Button
                        positive
                        content="Enviar mensagem"
                        icon="check"
                        labelPosition="right"
                        // onClick={sendMessage}
                        // disabled={load}
                        // loading={load}
                      ></Button>
                    </Button.Group>
                  </Grid.Column>

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