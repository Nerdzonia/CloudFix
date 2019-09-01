import {
  Grid,
  Header,
  Divider,
  Input,
  Form,
  TextArea,
  Breadcrumb,
  Button
} from "semantic-ui-react";

const TicketForm = props => {
  return (
    <Grid container centered columns={1}>
      <Grid.Column mobile={16} tablet={10} computer={12}>
        <Grid.Row>
          <Breadcrumb>
            <Breadcrumb.Section link active>
              Home
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
          </Breadcrumb>
        </Grid.Row>
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
                        icon="user outline"
                        iconposition="left"
                        fluid
                        label={{ icon: "asterisk" }}
                        labelPosition="right corner"
                        placeholder="Ex: Evillyn da Silva Oliveira..."
                      />
                      <Header size="small">Email: </Header>
                      <Input
                        icon="at"
                        iconposition="left"
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
                      <Header size="small">Sistema: </Header>
                      <Input
                        icon="computer"
                        iconposition="left"
                        fluid
                        label={{ icon: "asterisk" }}
                        labelPosition="right corner"
                        placeholder="Ex: Sanmiti..."
                      />
                    <Header size="small">Descrição: </Header>
                    <TextArea
                      icon="comment alternate outline"
                      iconposition="left"
                      /*react-textarea-autosize="true"*/
                      placeholder="Para que o atendimento seja eficiente, detalhe o máximo possível..."
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Button.Group floated="right">
                      <Button>Cancelar</Button>
                      <Button.Or text="ou" />
                      <Button
                        positive
                        content="Solicitar Ticket"
                        icon="check"
                        labelPosition="right"
                      ></Button>
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
