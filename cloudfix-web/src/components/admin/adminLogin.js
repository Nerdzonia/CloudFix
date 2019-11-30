import Link from "next/link";
import Router from 'next/router';
import {
  Grid,
  Header,
  Divider,
  Form,
  Breadcrumb,
  Button
} from "semantic-ui-react";

import { Alert } from '../alert/alert';
import authRequestor from '../../services/resources/auth';

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      load: false,
      alert: null,
      error: {
        login: false,
        password: false
      }
    };

    this.handleLoginForm = this.handleLoginForm.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  handleLoginForm(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkForm() {
    let login = false;
    let password = false;
    let load = false;

    this.state.login === "" ? login = true : login = false;

    this.state.password === "" ? password = true : password = false;

    if (!load && !password) {
      load = true;
      this.sendForm();
    } else
      load = false;

    this.setState({
      load: load,
      error: {
        login: login,
        password: password
      }
    });
  }

  async sendForm() {
    let data = await authRequestor.login({ email: this.state.login, password: this.state.password });
    
    if (Object.keys(data)[0] !== "error") {
      Router.push('/ticketList');
      this.setState({
        load: false
      });
    } else
      this.setState({
        load: false,
        alert: <Alert buttonColor="red" iconTitle="warning" iconButton="checkmark" message={data.error} open={true} title="Aviso" removeAlert={(remove) => this.setState({ alert: remove })} />,
      });
  }

  render() {
    return (
      <Grid container centered columns={1}>
        {this.state.alert}
        <Grid.Column mobile={16} tablet={10} computer={12}>
          <Grid.Row>
            <Breadcrumb>
              <Link href="/">
                <Breadcrumb.Section link>Home</Breadcrumb.Section>
              </Link>
              <Breadcrumb.Divider icon="right angle" />
              <Breadcrumb.Section active>Administrador</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Row>
          <Grid.Row>
            <Header as="h1" textAlign="center">
              Logar como Administrador
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
                        <Form.Field required>
                          <label size="small">Usuário: </label>
                          <Form.Input
                            icon="user outline"
                            iconPosition="left"
                            name="login"
                            fluid
                            label={{ icon: "asterisk" }}
                            error={this.state.error.login ? 'Preencha o campo' : null}
                            labelPosition="right corner"
                            placeholder="Ex: email@email.com"
                            onChange={this.handleLoginForm}
                            value={this.state.login}
                          />
                        </Form.Field>
                        <Form.Field required>
                          <label size="small">Senha: </label>
                          <Form.Input
                            icon="unlock alternate"
                            iconPosition="left"
                            name="password"
                            type="password"
                            fluid
                            error={this.state.error.password ? 'Preencha o campo' : null}
                            label={{ icon: "asterisk" }}
                            labelPosition="right corner"
                            onChange={this.handleLoginForm}
                            value={this.state.password}
                            placeholder="Ex: *****"
                          />
                        </Form.Field>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column floated="right" width={5}>
                      <Button.Group floated="right">
                        <Button onClick={() => this.setState({ login: "", password: "" })}>Limpar</Button>
                        <Button.Or text="ou" />
                        <Button
                          positive
                          content="Entrar como Admin"
                          icon="check"
                          labelPosition="right"
                          onClick={this.checkForm}
                          loading={this.state.load}
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
}

export default AdminLogin;
