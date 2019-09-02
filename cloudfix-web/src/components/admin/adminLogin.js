import Link from 'next/link';
import {
  Grid,
  Header,
  Divider,
  Input,
  Form,
  Breadcrumb,
  Button
} from "semantic-ui-react";

class AdminLogin extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      login: '',
      password: ''
    }

    this.handleLoginForm = this.handleLoginForm.bind(this);
  }

  handleLoginForm(event){
    this.setState({
      login: event.target.value
    });
  }

  render() {
    return (
      <Grid container centered columns={1}>
        <Grid.Column mobile={16} tablet={10} computer={12}>
          <Grid.Row>
            <Breadcrumb>
              <Link href="/"><Breadcrumb.Section link>Home</Breadcrumb.Section></Link>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section active>Administrador</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Row>
          <Grid.Row>
            <Header as="h1" textAlign="center">
              Logar com Administrador
            </Header>
            <Divider />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Form>
                <Grid stackable divided="vertically" columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Header size="medium">Dados do Administrador</Header>
                      <Divider />
                      <Grid.Row>
                        <Header size="small">Usuário: </Header>

                        <Input
                          icon="user outline"
                          iconPosition="left"
                          fluid
                          label={{ icon: "asterisk" }}
                          labelPosition="right corner"
                          placeholder="Ex: admin..."
                          onChange={this.handleLoginForm}
                          value={this.state.login}
                        />

                        <Header size="small">Senha: </Header>

                        <Input
                          icon="unlock alternate"
                          iconPosition="left"
                          fluid
                          label={{ icon: "asterisk" }}
                          labelPosition="right corner"
                          placeholder="Ex: *****"
                        ></Input>
                      </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                      <Button.Group floated="right">
                        <Button>Cancelar</Button>
                        <Button.Or text="ou" />
                        <Button
                          positive
                          content="Entrar como Admin"
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
  }
};

export default AdminLogin;
