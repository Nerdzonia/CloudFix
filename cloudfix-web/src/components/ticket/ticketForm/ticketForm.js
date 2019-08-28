import {
  Grid,
  Header,
  Divider,
  Input,
  Form,
  TextArea,
  Button
} from "semantic-ui-react";

const TicketForm = props => {
  return (
    <Grid container centered columns={1}>
      <Grid.Column mobile={16} tablet={10} computer={10}>
        <Grid.Row>
          <Header as="h1" textAlign="center">
            Solicitar Ticket
            <Header.Subheader>
              Para solicitar um ticket, é necessário que informe seus dados, e
              depois descrever o problema.
            </Header.Subheader>
          </Header>
          <Divider />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Form>
              <Grid stackable divided="vertically" columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Header size="medium">Dados Pessoais</Header>
                    <Divider />
                    <Grid.Row>
                      <Header size="small">Nome: </Header>
                      <Input
                        fluid
                        label={{ icon: "asterisk" }}
                        labelPosition="right corner"
                        placeholder="Ex: Evillyn da Silva Oliveira..."
                      />
                      <Header size="small">Email: </Header>
                      <Input
                        fluid
                        label={{ icon: "asterisk" }}
                        labelPosition="right corner"
                        placeholder="Ex: evillyndsoliveiras@gmail.com..."
                      />
                    </Grid.Row>
                  </Grid.Column>
                </Grid.Row>
                <Header size="medium">Detalhes sobre a Solicitação</Header>
                <Grid.Row>
                  <Grid.Column>
                    <Header size="small">Descrição: </Header>

                    <TextArea
                      react-textarea-autosize
                      placeholder="Para que o atendimento seja eficiente, detalhe o máximo possível..."
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column floated="right">
                    <Button.Group>
                      <Button>Cancelar</Button>
                      <Button.Or text="ou" />
                      <Button positive>Solicitar</Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};
export default TicketForm;
