import React, { useState } from "react";
import {
  Header,
  Container,
  Segment,
  Label,
  TextArea,
  Grid,
  Divider,
  Form,
  Button,
  Table,
  Comment,
  Icon,
  Breadcrumb
} from "semantic-ui-react";
import Link from "next/link";
import { Alert } from "../alert/alert";
import TicketRequestor from "../../services/resources/ticket";
import userIcon from "../../../assets/images/user-icon.png";
import adminIcon from "../../../assets/images/admin-icon.png";
import { loadToken } from '../../lib/token'
import * as moment from "moment";
moment.locale("pt-BR");
import lodash from "lodash";

const MessageContainer = ({ message }) => (
  <p style={{ fontSize: "1.4em" }}>{message}</p>
);

const MyTicket = props => {
  const [ticket, setTicket] = useState(props.ticket);

  const [input, setInput] = useState({
    message: ""
  });

  const [load, setLoad] = useState(false);

  const [alert, setAlert] = useState(null);

  const handleFildsChange = (e, { name, value }) => {
    setInput({ ...input, [name]: value });
  };

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
      };

      await TicketRequestor.addMessage(ticketObject);

      let data = await TicketRequestor.getTicket(ticketObject.ticketId);

      if (!data.error) {
        setTicket(data.data);
      } else {
        setAlert(
          <Alert
            buttonColor="red"
            iconTitle="warning"
            iconButton="checkmark"
            message={data.error}
            open={true}
            title="Aviso"
            removeAlert={setAlert}
          />
        );
      }

      setLoad(false);
    }
  };

  const [checkInput, setCheckInput] = useState({ message: false });

  const {
    _id,
    name,
    system,
    title,
    message,
    status,
    updatedAt,
    images,
    chat
  } = ticket;

  const Row = (createdAt, message, name, index, userType) => (
    <Container key={`${message}-${index}`}>
      <Comment>
        <Comment.Avatar
          src={userType === "client" ? userIcon : adminIcon}
          spaced={userType === "client" ? "left" : "right"}
        ></Comment.Avatar>
        <Comment.Content>
          <Comment.Author as="a">
            {userType === "client"
              ? `Solicitante: ${name}`
              : `Administrador: ${name}`}
          </Comment.Author>
          <Comment.Metadata>
            <div>{moment(createdAt).fromNow()}</div>
          </Comment.Metadata>
          <Comment.Text>{message}</Comment.Text>
        </Comment.Content>
      </Comment>
    </Container>
  );

  const updateTicketStatus = async (id, status) => {
    setLoad(true);

    let ticketObject = {
      ticketId: ticket._id,
      status: ticket.status
    };

    await TicketRequestor.updateStatus(id, status);

    let data = await TicketRequestor.getTicket(ticketObject.ticketId);

    if (!data.error) {
      setTicket(data.data);
    } else {
      setAlert(
        <Alert
          buttonColor="red"
          iconTitle="warning"
          iconButton="checkmark"
          message={data.error}
          open={true}
          title="Aviso"
          removeAlert={setAlert}
        />
      );
    }

    setLoad(false);
  };

  return (
    <Grid container centered columns={1}>
      <Grid.Column mobile={16} tablet={10} computer={16}>
        <Segment.Group>
          <Segment>
            <Grid.Row>
              {alert}
              <Header as="h1" block textAlign="center" attached="top">
                Bem vindo ao seu ticket,{" "}
                <span style={{ fontWeight: "bold" }}>{name}</span>!<br />
                você escolheu o sistema{" "}
                <span style={{ textDecoration: "underline" }}>{system}</span>
              </Header>
            </Grid.Row>
          </Segment>

          <Segment.Group>
            <Segment>
              <Breadcrumb size='big'>
                <Link href="/">
                  <Breadcrumb.Section link>Home </Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon="right angle" />
                <Link href="/ticketList">
                  <Breadcrumb.Section link>
                    Lista de Chamados{" "}
                  </Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon="right arrow" />
                <Breadcrumb.Section active>Ticket</Breadcrumb.Section>
              </Breadcrumb>
            </Segment>
          </Segment.Group>

          <Segment.Group>
            <Grid.Row>
              <Grid>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                  <Segment.Group>
                    <Segment>
                      <Table basic="very" celled>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <Header as="h4" image>
                                <Header.Content>
                                  <Header as="h3">Solicitante:</Header>
                                </Header.Content>
                              </Header>
                            </Table.Cell>
                            <Table.Cell>
                              <MessageContainer message={name} />
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell>
                              <Header as="h4" image>
                                <Header.Content>
                                  <Header as="h3">Sistema:</Header>
                                </Header.Content>
                              </Header>
                            </Table.Cell>
                            <Table.Cell>
                              <MessageContainer message={system} />
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell>
                              <Header as="h4" image>
                                <Header.Content>
                                  <Header as="h3">Assunto do ticket:</Header>
                                </Header.Content>
                              </Header>
                            </Table.Cell>
                            <Table.Cell>
                              <MessageContainer message={title} />
                            </Table.Cell>
                          </Table.Row>

                          {Array.isArray(images) && images.length !== 0 ? (
                            <Table.Row>
                              <Table.Cell>
                                <Header as="h4" image>
                                  <Header.Content>
                                    <Header as="h3">Imagens do erro</Header>
                                  </Header.Content>
                                </Header>
                              </Table.Cell>
                              <Table.Cell>
                                {images
                                  ? images.map((img, i) => (
                                      <a key={i} href={img} target="_blank">
                                        <MessageContainer
                                          message={`Imagem ${i + 1}`}
                                        />{" "}
                                      </a>
                                    ))
                                  : null}
                              </Table.Cell>
                            </Table.Row>
                          ) : null}

                          <Table.Row>
                            <Table.Cell>
                              <Header as="h4" image>
                                <Header.Content>
                                  <Header as="h3">Descrição:</Header>
                                </Header.Content>
                              </Header>
                            </Table.Cell>
                            <Table.Cell>
                              <MessageContainer message={message} />
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell>
                              <Header as="h4" image>
                                <Header.Content>
                                  <Header as="h3">Status:</Header>
                                </Header.Content>
                              </Header>
                            </Table.Cell>
                            <Table.Cell
                              positive={status === "solved"}
                              negative={status === "closed"}
                            >
                              <MessageContainer
                                message={
                                  <Label
                                    size="big"
                                    color={
                                      status === "open"
                                        ? "blue"
                                        : status === "solved"
                                        ? "green"
                                        : status === "closed"
                                        ? "red"
                                        : null
                                    }
                                  >
                                    {status === "open"
                                      ? "Aberto"
                                      : status === "solved"
                                      ? "Resolvido"
                                      : status === "closed"
                                      ? "Fechado"
                                      : null}
                                  </Label>
                                }
                              />
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell>
                              <Header as="h4" image>
                                <Header.Content>
                                  <Header as="h3">Última modificação:</Header>
                                </Header.Content>
                              </Header>
                            </Table.Cell>
                            <Table.Cell>
                              <MessageContainer
                                message={moment(updatedAt).fromNow()}
                              />
                            </Table.Cell>
                          </Table.Row>

                         {loadToken('token') 
                         ? <Table.Row>
                         <Table.Cell>
                           <Header as="h4" image>
                             <Header.Content>
                               <Header as="h3">Marcar ticket como:</Header>
                             </Header.Content>
                           </Header>
                         </Table.Cell>
                         <Table.Cell>
                           <Button
                             compact
                             size="large"
                             color="green"
                             icon
                             labelPosition="right"
                             onClick={() =>
                               updateTicketStatus(_id, "solved")
                             }
                             disabled={
                               status === "solved" || status === "closed"
                             }
                           >
                             Resolvido
                             <Icon name="check circle" />
                           </Button>
                           <Button
                             compact
                             size="large"
                             color="red"
                             icon
                             labelPosition="right"
                             onClick={() =>
                               updateTicketStatus(_id, "closed")
                             }
                             disabled={status === "solved"}
                           >
                             Fechado
                             <Icon name="stop circle" />
                           </Button>
                         </Table.Cell>
                       </Table.Row> : null} 

                          

                        </Table.Body>
                      </Table>
                    </Segment>

                    <Segment>
                      {status === "open" ? (
                        <>
                          <Form reply>
                            <Form.Group>
                              <Form.Field required>
                                <TextArea
                                  style={{
                                    minWidth: 1040,
                                    minHeight: 150,
                                    resize: "none",
                                    fontSize: 20
                                  }}
                                  placeholder="Digite uma mensagem..."
                                  error={
                                    checkInput.message
                                      ? { content: "Digite alguma mensagem!" }
                                      : null
                                  }
                                  name="message"
                                  value={input.message}
                                  onChange={handleFildsChange}
                                />
                              </Form.Field>
                            </Form.Group>
                          </Form>
                          <Button
                            size="large"
                            positive
                            content="Enviar mensagem"
                            icon="right arrow"
                            labelPosition="right"
                            onClick={sendMessage}
                            disabled={load}
                            loading={load}
                          ></Button>
                        </>
                      ) : null}
                    </Segment>

                    <Segment>
                      <Divider hidden />
                      <Grid.Row>
                        <Comment.Group>
                          {Array.isArray(chat) && chat.length !== 0 ? (
                            <>
                              <Header as="h2">
                                Acompanhe as atualizações do seu ticket
                              </Header>
                              <Comment.Group size="huge">
                                {lodash
                                  .sortBy(chat, o => o.updatedAt)
                                  .reverse()
                                  .map((e, i) =>
                                    Row(
                                      e.createdAt,
                                      e.message,
                                      e.name,
                                      i,
                                      e.userType
                                    )
                                  )}
                              </Comment.Group>
                            </>
                          ) : null}
                        </Comment.Group>
                      </Grid.Row>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Segment.Group>
        </Segment.Group>
      </Grid.Column>
    </Grid>
  );
};

export default MyTicket;
